"use client";

import PDFRenderer from "@/components/PDF/PDFRenderer";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function BookPage({ params }: { params: { bookId: string } }) {
  const pdfUrl = `/pdfs/${params.bookId}.pdf`;
  
  return (
    <div className="flex-1 h-[calc(100vh-4rem)]">
      <Suspense fallback={
        <div className="flex items-center justify-center h-full">
          <Loader2 className="animate-spin h-8 w-8" />
          <span className="ml-2">Loading PDF...</span>
        </div>
      }>
        <PDFRenderer url={pdfUrl} />
      </Suspense>
    </div>
  );
}