'use client';

import dynamic from 'next/dynamic';


const PdfViewerInner = dynamic(
  () => import('@/app/utils/pdfviewer'),
  { ssr: false, loading: () => <p>Chargement du lecteur PDF...</p> }
);

export default function ViewerLauncher({filename}) {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">PDF document</h1>
      
      <PdfViewerInner fileUrl={filename} />
    </main>
  );
}
