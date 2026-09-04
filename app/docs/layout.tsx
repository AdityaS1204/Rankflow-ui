import Navbar from "@/components/layout/Navbar";
import DocsSidebar from "@/components/docs/Sidebar";
import AuthorFooter from "@/components/layout/AuthorFooter";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="w-full px-6 lg:px-10 xl:px-16 pt-20">
        <div className="flex gap-10 xl:gap-16">
          <DocsSidebar />
          <main className="min-w-0 flex-1 py-8 px-2 sm:px-6 lg:px-12 flex flex-col items-center">
            <div className="w-full max-w-4xl">
              {children}
              <AuthorFooter />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
