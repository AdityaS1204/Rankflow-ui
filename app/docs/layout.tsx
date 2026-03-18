import Navbar from "@/components/layout/Navbar";
import DocsSidebar from "@/components/docs/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pt-20">
        <div className="flex gap-8">
          <DocsSidebar />
          <main className="min-w-0 flex-1 py-8">{children}</main>
        </div>
      </div>
    </>
  );
}
