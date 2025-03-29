"use client";
import React from "react";
import PDFRenderer from "@/components/PDF/PDFRenderer";

const PythonSubject = () => {
  const pdfUrl = "https://assets.openstax.org/oscms-prodcms/media/documents/Introduction_to_Python_Programming_-_WEB.pdf";
  
  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <PDFRenderer url={pdfUrl} />
    </div>
  );
};

export default PythonSubject;