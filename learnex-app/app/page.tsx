"use client";
import React, { Suspense } from "react";
import PDFRenderer from "@/components/PDF/PDFRenderer";
import { Loader2 } from "lucide-react";

const HomePage = () => {
  const pdfUrl = "/pdfs/python-programming-optimized.pdf";
  
  return (
    <div className="h-full">
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
};

export default HomePage;
