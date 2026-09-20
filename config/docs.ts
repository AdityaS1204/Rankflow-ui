import { registry } from "@/registry/index";

export interface DocsSidebarItem {
  title: string;
  href: string;
  isNew?: boolean;
}

export interface DocsSidebarSection {
  label: string;
  items: DocsSidebarItem[];
}

export function getDocsNavigation(): DocsSidebarSection[] {
  const components = registry.filter((item) => item.type === "components:ui");

  const isAI = (c: (typeof components)[number]) =>
    c.tags.includes("ai") || c.tags.includes("agent");

  const aiComponents = components
    .filter((c) => isAI(c))
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
      isNew: (item as any).isNew,
    }));

  const buttons = components
    .filter((c) => !isAI(c) && c.tags.includes("button"))
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
      isNew: (item as any).isNew,
    }));

  const cards = components
    .filter((c) => !isAI(c) && c.tags.includes("card"))
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
      isNew: (item as any).isNew,
    }));

  const textAnimations = components
    .filter((c) => !isAI(c) && c.tags.includes("text"))
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
      isNew: (item as any).isNew,
    }));

  const blocks = components
    .filter(
      (c) =>
        !isAI(c) &&
        !c.tags.includes("button") &&
        !c.tags.includes("card") &&
        !c.tags.includes("backgrounds") &&
        !c.tags.includes("text") &&
        !c.tags.includes("page-sections")
    )
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
      isNew: (item as any).isNew,
    }));

  const PageSections = components
    .filter((c) => !isAI(c) && c.tags.includes("page-sections"))
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
      isNew: (item as any).isNew,
    }));

  const backgrounds = components
    .filter((c) => !isAI(c) && c.tags.includes("backgrounds"))
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
      isNew: (item as any).isNew,
    }));

  return [
    {
      label: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs/introduction" },
        { title: "Installation", href: "/docs/installation" },
      ],
    },
    {
      label: "AI Components",
      items: aiComponents,
    },
    {
      label: "Text Animations",
      items: textAnimations,
    },
    {
      label: "Buttons",
      items: buttons,
    },
    {
      label: "Cards",
      items: cards,
    },
    {
      label: "Blocks",
      items: blocks,
    },
    {
      label: "Page sections",
      items: PageSections,
    },
    {
      label: "Backgrounds",
      items: backgrounds,
    },
  ];
}
