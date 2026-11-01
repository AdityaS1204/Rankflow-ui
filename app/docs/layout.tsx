import Navbar from "@/components/layout/Navbar";
import DocsLayoutClient from "@/components/docs/DocsLayoutClient";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <DocsLayoutClient>{children}</DocsLayoutClient>
    </>
  );
}
