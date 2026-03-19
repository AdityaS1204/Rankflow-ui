import { registry } from "@/registry/index";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { PackageManagerTabs } from "@/components/docs/PackageManagerTabs";
import { DocsPager } from "@/components/docs/DocsPager";

export function generateStaticParams() {
  return registry
    .filter((item) => item.type === "components:ui")
    .map((item) => ({ slug: item.name }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = registry.find(
    (item) => item.name === slug && item.type === "components:ui"
  );

  if (!component) {
    notFound();
  }

  const deps = component.dependencies
    .filter((d: string) => d !== "react")
    .join(" ");

  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <p className="text-sm text-muted-foreground mb-4">
        Docs / Components /{" "}
        <span className="text-foreground font-medium">{component.title}</span>
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
        {component.title}
      </h1>
      <p className="text-lg text-muted-foreground mb-10">
        {component.description}
      </p>

      <hr className="border-border mb-10" />

      {/* Placeholder preview */}
      <div className="rounded-lg border border-border bg-card/50 p-10 flex items-center justify-center min-h-[200px] mb-10">
        <p className="text-muted-foreground text-sm">
          Component preview coming soon.
        </p>
      </div>

      {/* Dependencies */}
      {deps && (
        <section className="space-y-3 mb-10">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Dependencies
          </h2>
          <PackageManagerTabs command={deps} />
        </section>
      )}

      {/* Install via CLI */}
      <section className="space-y-3 mb-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <PackageManagerTabs command={`rankflow-ui add ${component.name}`} isExecute />
      </section>

      <DocsPager />
    </article>
  );
}
