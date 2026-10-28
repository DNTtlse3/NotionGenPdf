'use client';

import React, { useState } from 'react';
import { getFileContent } from '@/app/utils/actions';

interface DownloadButtonProps {
  fileName: string;
}

export default function DownloadButton({ fileName }: DownloadButtonProps): React.JSX.Element {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true);
    try {
      // 1. Récupération du fichier depuis le serveur en Base64
      const base64Content: string = await getFileContent(fileName);
      
      // 2. Conversion du Base64 en Blob binaire
      const byteCharacters: string = atob(base64Content);
      const byteNumbers: number[] = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray: Uint8Array = new Uint8Array(byteNumbers);
      const blob: Blob = new Blob([byteArray], { type: 'application/octet-stream' });

      // 3. Dialogue d'enregistrement natif (FileSystemWritableFileStream API)
      if ('showSaveFilePicker' in window) {
        // @ts-ignore - showSaveFilePicker n'est pas encore standardisé dans certains types TS globaux
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } else {
        // Solution de repli (Fallback) pour les navigateurs plus anciens
        const url: string = window.URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      // Gère aussi l'annulation de la fenêtre par l'utilisateur
      console.warn("Téléchargement annulé ou interrompu par l'utilisateur", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded transition"
    >
      {isDownloading ? 'Préparation...' : 'Enregistrer sous...'}
    </button>
  );
}