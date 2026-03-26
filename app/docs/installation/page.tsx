import { CodeBlock } from "@/components/docs/CodeBlock";
import { PackageManagerTabs } from "@/components/docs/PackageManagerTabs";
import { DocsPager } from "@/components/docs/DocsPager";

export default function InstallationPage() {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <p className="text-sm text-muted-foreground mb-4">
        Docs / Getting Started /{" "}
        <span className="text-foreground font-medium">Installation</span>
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
        Installation
      </h1>
      <p className="text-lg text-muted-foreground mb-10">
        Get started with RankFlow UI in your React project in a few simple steps.
      </p>

      <hr className="border-border mb-10" />

      {/* Step 1 */}
      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          1. Create a new React project
        </h2>
        <p className="text-sm text-muted-foreground">
          If you don&apos;t have a project yet, scaffold one with Next.js:
        </p>
        <CodeBlock code="npx create-next-app@latest my-app --typescript --tailwind --eslint" language="bash" hideLabel showCopy />
      </section>

      {/* Step 2 */}
      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          2. Install peer dependencies
        </h2>
        <p className="text-sm text-muted-foreground">
          These packages are used across RankFlow UI components. Individual component
          pages list any additional dependencies they need.
        </p>
        <PackageManagerTabs command="motion clsx tailwind-merge" />
      </section>

      {/* Step 3 */}
      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          3. Add the utility helper
        </h2>
        <p className="text-sm text-muted-foreground">
          Create a{" "}
          <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono">
            lib/utils.ts
          </code>{" "}
          file in your project:
        </p>
        <CodeBlock
          language="typescript"
          filename="lib/utils.ts"
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
        />
      </section>

      <hr className="border-border mb-10" />

      {/* CLI Install */}
      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Add components via CLI
        </h2>
        <p className="text-sm text-muted-foreground">
          The fastest way to install. The CLI fetches the component source and places
          it directly into your project.
        </p>
        <PackageManagerTabs command="rankflow-ui@latest add <component-name>" isExecute />
        <p className="text-sm text-muted-foreground">
          For example, to add the Animated Border Button:
        </p>
        <PackageManagerTabs command="rankflow-ui@latest add animated-border" isExecute />
      </section>

      {/* List */}
      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          List available components
        </h2>
        <PackageManagerTabs command="rankflow-ui@latest list" isExecute />
      </section>

      <hr className="border-border mb-10" />

      {/* Manual */}
      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Manual Installation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every component page includes the full source code. Copy it into your{" "}
          <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono">
            components/ui/
          </code>{" "}
          directory and import it directly.
        </p>
        <div className="rounded-lg border border-border bg-card/50 p-5">
          <p className="text-sm font-semibold text-foreground mb-3">Suggested project structure</p>
          <CodeBlock
            language="bash"
            filename="Project Structure"
            code={`your-project/
├── components/
│   └── ui/
│       ├── animated-border.tsx
│       ├── glow-button.tsx
│       └── ...
├── lib/
│   └── utils.ts
└── ...`}
          />
        </div>
      </section>

      <DocsPager />
    </article>
  );
}
