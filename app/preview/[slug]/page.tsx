import { registry } from "@/registry/index";
import { registryComponents } from "@/registry/registry-ui";
import { notFound } from "next/navigation";
import React from "react";

export function generateStaticParams() {
  return registry
    .filter((item) => (item as any).fullScreenPreview === true)
    .map((item) => ({ slug: item.name }));
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const componentMetadata = registry.find((item) => item.name === slug);

  if (!componentMetadata || !(componentMetadata as any).fullScreenPreview) {
    notFound();
  }

  const Component = registryComponents[slug];

  if (!Component) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen relative bg-background overflow-x-hidden">
      <Component />
    </main>
  );
}
