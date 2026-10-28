import React from 'react';
import { getFilesList } from '@/app/utils/actions';
import DownloadButton from '@/app/ui/downloadButton';

export default async function Page(): Promise<React.JSX.Element> {
  const files: string[] = await getFilesList();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">Files</h1>
      
      {files.length === 0 ? (
        <p className="text-gray-500">No files found in the folder.</p>
      ) : (
        <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200 bg-white shadow-sm">
          {files.map((file: string) => (
            <li key={file} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <span className="text-sm font-medium text-gray-900 truncate mr-4">
                {file}
              </span>
              <DownloadButton fileName={file} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
