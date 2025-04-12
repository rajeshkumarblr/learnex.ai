"use client";
import React, { useState, useEffect } from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import type { LoadError } from '@react-pdf-viewer/core';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFRendererProps {
  url: string;
}

const PDFRenderer: React.FC<PDFRendererProps> = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [validUrl, setValidUrl] = useState<string>('');

  // Configure default layout plugin to show bookmarks tab by default
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [
      // Show bookmarks tab first
      {
        ...defaultTabs[1], // Bookmarks tab is usually the second tab
        isSelected: true,
      },
      defaultTabs[0], // Thumbnails tab
      defaultTabs[2], // Attachments tab
    ],
  });

  useEffect(() => {
    try {
      // For local files (starting with /pdfs/)
      if (url.startsWith('/pdfs/')) {
        setValidUrl(url);
      } else if (url.startsWith('http')) {
        // For external URLs
        setValidUrl(url);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error setting URL:', error);
    }
  }, [url]);

  if (loading || !validUrl) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div>Loading PDF...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="mx-auto h-[calc(100vh-2rem)]">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={validUrl}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={SpecialZoomLevel.PageWidth}  // Also set here for initial load
            onDocumentLoad={() => {
              console.log('PDF document loaded:', validUrl);
            }}
            renderLoader={() => (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div>Loading PDF...</div>
                </div>
              </div>
            )}
            renderError={(error: LoadError) => (
              <div className="text-red-500 p-4">
                <div>PDF viewer error: {error.message}</div>
                <div>URL: {validUrl}</div>
                <button 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => window.open(validUrl, '_blank')}
                >
                  Open PDF in new tab
                </button>
              </div>
            )}
          />
        </Worker>
      </div>
    </div>
  );
};

export default PDFRenderer;