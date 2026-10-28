import Link from 'next/link';
import SideNav from '@/app/ui/dashboard/sidenav';
import NotionGenPdfLogo from '@/app/ui/notion-gen-pdf-logo';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-500 p-4 md:h-30"
        href="/"
      >
        <div className="h-10">
          <NotionGenPdfLogo />
        </div>
      </Link>
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
    </>
  );
}