import Navbar from "@/components/layout/Navbar";
import AuthorFooter from "@/components/layout/AuthorFooter";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-16 min-h-screen">
        {children}
        <AuthorFooter />
      </div>
    </>
  );
}
