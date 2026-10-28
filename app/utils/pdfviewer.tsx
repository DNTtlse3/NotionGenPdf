/*
  Source code:
    https://dev.to/ryaddev/pdf-viewer-in-nextjs-134-using-react-pdf-viewer-nom
*/

'use client';

import React from 'react';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import des styles obligatoires
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PdfViewerInnerProps {
  fileUrl: string;
}

export default function PdfViewerInner({ fileUrl }: PdfViewerInnerProps) {
  
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div style={{ height: '550px' }}>
        <Viewer 
          fileUrl={fileUrl} 
          plugins={[defaultLayoutPluginInstance]} 
        />
      </div>
    </Worker>
  );
}
