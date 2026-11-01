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

  // Read optional usage / demo code
  let usageCode = "";
  const possibleUsageFile = path.join(
    process.cwd(),
    `registry/components/${component.name}-demo.tsx`
  );
  if (fs.existsSync(possibleUsageFile)) {
    try {
      usageCode = fs.readFileSync(possibleUsageFile, "utf-8");
    } catch (e) {
      console.error("Failed to read usage file:", e);
    }
  }

  const deps = component.dependencies
    .filter((d: string) => d !== "react")
    .join(" ");

  const isLarge = (component as any).size === "lg";

  return (
    <article className={cn("pb-20 w-full", isLarge ? "max-w-5xl" : "max-w-4xl")}>
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2.5">
          {component.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          {component.description}
        </p>
      </div>

      <ComponentPreview
        slug={slug}
        code={sourceCode}
        usageCode={usageCode || undefined}
        filename={`components/ui/${component.name}.tsx`}
        usageFilename={`components/demo/${component.name}-demo.tsx`}
        componentName={component.title}
        dependencies={component.dependencies}
      />

      <div className="space-y-12">
        {/* Dependencies */}
        {deps && (
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground text-balance">
              Dependencies
            </h2>
            <p className="text-muted-foreground text-sm">
              Install the following dependencies to use this component:
            </p>
            <PackageManagerTabs command={deps} />
          </section>
        )}

        {/* Install via CLI */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground text-balance">
            Installation
          </h2>
          <p className="text-muted-foreground text-sm">
            Run the following command in your terminal to add the component to your project:
          </p>
          <PackageManagerTabs command={`rankflow-ui@latest add ${component.name}`} isExecute />
        </section>
      </div>

      {/* Props Reference */}
      {component.props && component.props.length > 0 && (
        <PropsTable props={component.props} componentName={component.title || component.name} />
      )}
      <div className="mt-5 pt-5">
        <DocsPager />
      </div>
    </article>
  );
}