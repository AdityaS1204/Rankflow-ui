import { registry } from "@/registry/index";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { PackageManagerTabs } from "@/components/docs/PackageManagerTabs";
import { DocsPager } from "@/components/docs/DocsPager";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import fs from "fs";
import path from "path";

import { cn } from "@/lib/utils";

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

  if (!component || !component.files) {
    notFound();
  }

  // Read component source code
  let sourceCode = "";
  try {
    const filePath = path.join(process.cwd(), component.files[0]);
    sourceCode = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error("Failed to read component file:", error);
    sourceCode = "// Source code not available";
  }

  const deps = component.dependencies
    .filter((d: string) => d !== "react")
    .join(" ");

  const isLarge = (component as any).size === "lg";

  return (
    <article className={cn("pb-20", isLarge ? "max-w-5xl" : "max-w-3xl")}>
      {/* Breadcrumb */}
      <p className="text-sm text-muted-foreground mb-4">
        Docs / Components /{" "}
        <span className="text-foreground font-medium">{component.title}</span>
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
        {component.title}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        {component.description}
      </p>

      <ComponentPreview
        slug={slug}
        code={sourceCode}
        filename={`components/ui/${component.name}.tsx`}
      />

      <div className="space-y-12">
        {/* Dependencies */}
        {deps && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
              Dependencies
            </h2>
            <p className="text-muted-foreground text-sm">
              Install the following dependencies to use this component:
            </p>
            <PackageManagerTabs command={deps} />
          </section>
        )}

        {/* Install via CLI */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Installation
          </h2>
          <p className="text-muted-foreground text-sm">
            Run the following command in your terminal to add the component to your project:
          </p>
          <PackageManagerTabs command={`rankflow-ui add ${component.name}`} isExecute />
        </section>
      </div>

      {/* Props Reference */}
      {component.props && component.props.length > 0 && (
        <PropsTable props={component.props} />
      )}
      <div className="mt-5 pt-5">
        <DocsPager />
      </div>
    </article>
  );
}