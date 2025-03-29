"use client";
import React from "react";
import PDFRenderer from "@/components/PDF/PDFRenderer";

const PythonPage = () => {
  const pdfUrl = "/pdfs/python-programming.pdf";
  
  return (
    <div className="flex-1 w-full h-[calc(100vh-4rem)]">
      <PDFRenderer url={pdfUrl} />
    </div>
  );
};

export default PythonPage;