"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SideBar, SideBarSection } from "@/components/ui/sideBar";
import { pdfjs } from 'react-pdf';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { ChevronDown, ChevronRight } from "lucide-react";

interface TOCItem {
  title: string;
  pageNumber: number;
  items?: TOCItem[];
}

// Define the correct type for PDF references
interface PDFRef {
  num: number;
  gen: number;
}

const CustomSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<{[key: number]: boolean}>({});
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  useEffect(() => {
    // Extract bookId from pathname
    const match = pathname.match(/\/books\/(.+)$/);
    const bookId = match ? match[1] : null;
    setSelectedBook(bookId);

    if (bookId) {
      loadTOC(bookId);
    } else {
      // Reset states when no book is selected
      setToc([]);
      setError(null);
      setExpandedChapters({});
    }
  }, [pathname]);

  const loadTOC = async (bookId: string) => {
    try {
      setLoading(true);
      setError(null);
      const loadingTask = pdfjs.getDocument(`/pdfs/${bookId}.pdf`);
      const pdf = await loadingTask.promise;
      
      const outline = await pdf.getOutline();
      
      if (!outline || outline.length === 0) {
        setError('PDF does not contain a table of contents');
        return;
      }

      const getPageNumber = async (item: any): Promise<number> => {
        try {
          if (typeof item.dest === 'string') {
            const dest = await pdf.getDestination(item.dest);
            if (dest?.[0]) {
              const ref = dest[0] as PDFRef;
              const pageIndex = await pdf.getPageIndex(ref);
              return pageIndex + 1;
            }
          } else if (Array.isArray(item.dest) && item.dest[0]) {
            const ref = item.dest[0] as PDFRef;
            const pageIndex = await pdf.getPageIndex(ref);
            return pageIndex + 1;
          }
          throw new Error('Unable to determine page number');
        } catch (e) {
          console.warn(`Failed to get page number for "${item.title}":`, e);
          const match = item.title.match(/Chapter\s+(\d+)/i);
          return match ? parseInt(match[1]) : 1;
        }
      };

      const processItem = async (item: any): Promise<TOCItem> => {
        const pageNumber = await getPageNumber(item);
        const subItems = item.items || [];
        
        return {
          title: item.title || 'Untitled',
          pageNumber,
          items: await Promise.all(subItems.map(processItem))
        };
      };

      const tocItems = await Promise.all(outline.map(processItem));
      setToc(tocItems);

    } catch (error) {
      console.error('Error loading TOC:', error);
      setError('Failed to load table of contents');
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (pageNumber: number) => {
    const element = document.querySelector(`[data-page-number="${pageNumber}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Find the PDFRenderer instance and update its page number
      const event = new CustomEvent('pdfPageChange', { detail: { pageNumber } });
      window.dispatchEvent(event);
    }
  };

  const toggleChapter = (index: number) => {
    setExpandedChapters(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleBookClick = (bookId: string) => {
    router.push(`/books/${bookId}`);
    setIsExpanded(true); // Expand when book is selected
  };

  return (
    <div className="w-64 border-r bg-background h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
      <SimpleBar 
        className="h-full w-full" 
        style={{ 
          overflowX: 'hidden'
        }}
      >
        <SideBar>
          <SideBarSection title="Python" link="#">
            <div className="px-4 py-2">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-accent rounded-md p-2"
                onClick={() => {
                  handleBookClick('python-programming-optimized');
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="font-medium">Introduction to Python Programming</span>
              </div>
              
              {isExpanded && selectedBook && (
                <div className="ml-2 mt-2">
                  {loading ? (
                    <div className="px-4 py-2 text-sm">Loading...</div>
                  ) : error ? (
                    <div className="px-4 py-2 text-sm text-red-500">{error}</div>
                  ) : toc.length > 0 ? (
                    toc.map((item, index) => (
                      <div key={index} className="mb-1">
                        <div 
                          className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 rounded-md p-2 text-sm"
                        >
                          {item.items && item.items.length > 0 && (
                            <span onClick={(e) => {
                              e.stopPropagation();
                              toggleChapter(index);
                            }}>
                              {expandedChapters[index] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </span>
                          )}
                          <span 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemClick(item.pageNumber);
                            }}
                            className="flex-1"
                          >
                            {item.title}
                          </span>
                        </div>
                        
                        {expandedChapters[index] && item.items && item.items.length > 0 && (
                          <div className="ml-6">
                            {item.items.map((subItem, subIndex) => (
                              <div
                                key={`${index}-${subIndex}`}
                                className="py-1 text-sm hover:bg-accent/50 cursor-pointer rounded-md p-2"
                                onClick={() => handleItemClick(subItem.pageNumber)}
                              >
                                {subItem.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm">No table of contents available</div>
                  )}
                </div>
              )}
            </div>
          </SideBarSection>
        </SideBar>
      </SimpleBar>
    </div>
  );
};

export default CustomSideBar;
