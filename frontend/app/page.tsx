"use client";
import React, { useState, useEffect, useRef } from "react";
import CustomSidebar from "@/components/CustomSidebar";
import PDFRenderer from "@/components/PDF/PDFRenderer";
import { Book } from "@/services/bookService";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Hide sidebar when book is selected
  const handleBookSelect = (book: Book) => {
    console.log("Selected book for PDF:", book);
    setSelectedBook(book);
    // Don't auto-hide sidebar on book selection
  };

  // Show sidebar when hovering near left edge or over sidebar
  const handleMouseMove = (e: React.MouseEvent) => {
    const isNearLeftEdge = e.clientX < 50; // Increased detection area
    const isOverSidebar = sidebarRef.current?.contains(e.target as Node);
    setIsHovering(isNearLeftEdge || Boolean(isOverSidebar));
  };

  // Update sidebar visibility based on hover state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSidebarVisible(isHovering);
    }, isHovering ? 0 : 1000); // Longer delay before hiding

    return () => clearTimeout(timer);
  }, [isHovering]);

  return (
    <div className="flex h-screen" onMouseMove={handleMouseMove}>
      <div
        ref={sidebarRef}
        className={cn(
          "transition-all duration-300 ease-in-out",
          isSidebarVisible ? "w-64" : "w-0"
        )}
      >
        <div className={cn(
          "h-full transition-all duration-300",
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        )}>
          <CustomSidebar onBookSelect={handleBookSelect} />
        </div>
      </div>
      
      <main className="flex-1 overflow-hidden">
        {selectedBook ? (
          <PDFRenderer url={selectedBook.pdf_url} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a book to view its content</p>
          </div>
        )}
      </main>
    </div>
  );
}
