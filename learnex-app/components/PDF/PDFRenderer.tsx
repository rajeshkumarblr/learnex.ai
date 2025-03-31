"use client";
import React, { useRef, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import SimpleBar from "simplebar-react";
import PDFToolbar from "./PDFToolbar";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import ContextMenu from "./ContextMenu";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFRendererProps {
  url: string;
}

const DEFAULT_CONTEXT_MENU = {
  x: 0,
  y: 0,
  visible: false,
};

const PDFRenderer = ({ url }: PDFRendererProps) => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState(DEFAULT_CONTEXT_MENU);
  const { width, ref } = useResizeDetector();

  useEffect(() => {
    if (!loading && totalPages > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const pageNumber = parseInt(entry.target.getAttribute('data-page-number') || '1');
              if (pageNumber !== currentPage) {
                setCurrentPage(pageNumber);
              }
            }
          });
        },
        { 
          threshold: 0.7, // Increase threshold for better accuracy
          root: containerRef.current?.querySelector('.simplebar-content-wrapper') || null,
          rootMargin: '-10% 0px' // Add margin to improve detection
        }
      );

      // Set up page observers after a small delay to ensure pages are rendered
      setTimeout(() => {
        const pages = document.querySelectorAll('.react-pdf__Page');
        pages.forEach((page, index) => {
          const pageNum = index + 1;
          page.setAttribute('data-page-number', String(pageNum));
          observer.observe(page);
        });
      }, 100);

      return () => observer.disconnect();
    }
  }, [loading, totalPages, currentPage]);

  // Add this effect to listen for page changes
  useEffect(() => {
    const handlePageChange = (e: CustomEvent<{ pageNumber: number }>) => {
      const newPage = e.detail.pageNumber;
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };

    window.addEventListener('pdfPageChange', handlePageChange as EventListener);
    return () => {
      window.removeEventListener('pdfPageChange', handlePageChange as EventListener);
    };
  }, [totalPages]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      const element = document.querySelector(`[data-page-number="${nextPage}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      const element = document.querySelector(`[data-page-number="${prevPage}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      const element = document.querySelector(`[data-page-number="${page}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { pageX, pageY } = e;

    setContextMenu({
      x: pageX,
      y: pageY,
      visible: true,
    });
  };

  const selectPDFText = () => {
    console.log("Selecting text");
    window
      .getSelection()
      ?.selectAllChildren(document.querySelector(".pdf-page")!);

    const page = document.getSelection()?.toString();

    window.getSelection()?.removeAllRanges();
    console.log("Summary", page);
    return page;
  };

  const selectAllPages = () => {
    return "";
  };

  const explain = () => {
    const currentSelection = document.getSelection()?.toString();
    const context = selectPDFText();

    console.log("Explain", currentSelection);
    console.log("Context", context);

    return [currentSelection, context];
  };

  const handleDocumentLoadSuccess = async ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
    setCurrentPage(1); // Reset to page 1 when document loads
    setLoading(false);
  };

  return (
    <div
      className="flex flex-col items-center shadow rounded-md w-full h-full overflow-hidden"
      onContextMenu={(e) => handleContextMenu(e)}
      onSelect={(e) => {
        e.preventDefault();
        console.log("Selected", e);
      }}
      ref={containerRef}
    >
      <ContextMenu
        {...contextMenu}
        onSummarize={() => selectPDFText()}
        close={() => setContextMenu(DEFAULT_CONTEXT_MENU)}
        onExplain={() => explain()}
      />
      <PDFToolbar
        pages={totalPages}
        isLoading={loading}
        currentPage={currentPage}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onPageChange={handlePageChange}
        scale={scale}
        onScaleChange={(scale) => setScale(scale)}
        onSummarize={(type) => {
          if (type === "page") {
            selectPDFText();
          } else {
            selectAllPages();
            toast({
              description: "Coming Soon",
            });
          }
        }}
      />
      <div className="flex-1 w-full h-full max-h-full">
        <SimpleBar
          autoHide={false}
          className="w-full h-full max-h-[calc(100vh-10rem)]"
          style={{ overflowX: 'hidden' }}
        >
          <div ref={ref} className="w-full flex flex-col items-center">
            <Document
              file={url}
              loading={
                <div className="flex justify-center items-center">
                  <div className="animate-spin my-24">
                    <Loader2 size="64" />
                  </div>
                </div>
              }
              onLoadSuccess={handleDocumentLoadSuccess}
              onLoadError={({}) => {
                toast({
                  title: "Error",
                  description: "Failed to load PDF",
                  variant: "destructive",
                });
                setLoading(false);
              }}
              className="w-full"
            >
              {Array.from(new Array(totalPages), (el, index) => {
                const pageNumber = index + 1;
                return (
                  <Page
                    key={`page_${pageNumber}`}
                    pageNumber={pageNumber}
                    data-page-number={pageNumber}
                    className="pdf-page"
                    width={width ? width : undefined}
                    scale={scale}
                  />
                );
              })}
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PDFRenderer;