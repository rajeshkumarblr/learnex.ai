import React, { useState, useEffect, useRef } from 'react';

const PdfComp = () => {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  // Load PDF.js when component mounts
  useEffect(() => {
    const loadPdfJs = async () => {
      const script = document.createElement('script');
      script.src = 'https://mozilla.github.io/pdf.js/build/pdf.js';
      script.async = true;
      
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
      };
      
      document.body.appendChild(script);
    };
    
    loadPdfJs();
    loadPDF();
  }, []);

  const renderPage = async (pageNum) => {
    if (!pdfDoc) return;

    const page = await pdfDoc.getPage(pageNum);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;
  };
  const loadPDF = async () => {
    try {
      // Replace this URL with your PDF file path
      const pdfPath = '/sample.pdf';
      const pdf = await window.pdfjsLib.getDocument(pdfPath).promise;
      console.log(pdfPath);
      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
      setPageNum(1);
      setTimeout(() => renderPage(1, pdf), 100);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await window.pdfjsLib.getDocument(typedArray).promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setPageNum(1);
        setTimeout(() => renderPage(1), 100);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const changePage = async (delta) => {
    const newPageNum = pageNum + delta;
    if (newPageNum >= 1 && newPageNum <= numPages) {
      setPageNum(newPageNum);
      await renderPage(newPageNum);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text) {
      setSelectedText(text);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-white">
        
          <canvas 
            ref={canvasRef}
            className="max-w-full mx-auto"
            onMouseUp={handleTextSelection}
          />
          
          {numPages && (
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => changePage(-1)}
                disabled={pageNum <= 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              <span>Page {pageNum} of {numPages}</span>
              <button
                onClick={() => changePage(1)}
                disabled={pageNum >= numPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {selectedText && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-semibold mb-2">Selected Text:</h3>
            <p>{selectedText}</p>
            <button
              onClick={() => navigator.clipboard.writeText(selectedText)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Copy Text
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfComp;