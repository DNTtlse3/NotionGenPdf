'use client'

import Search from '@/app/ui/search';
import { Button } from '@/app/ui/button';

export default function Page() {
  return (
    <div>
      <p className="text-lg font-semibold text-black">Dashboard</p>
      <div className="flex flex-wrap gap-5">
        <Search />
        <Button children="Search"/>
        <Button children="Refresh"/>
      </div>
    </div>

  );
}
