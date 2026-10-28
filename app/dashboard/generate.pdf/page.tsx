'use client'

import ViewerLauncher from '@/app/utils/viewerInit';

export default function Page() {
  return (
    <div className="w-[650px] h-[600px] border border-gray-200 rounded">
      <ViewerLauncher filename="/TMP/Admin.pdf"/>
    </div>
  );
}