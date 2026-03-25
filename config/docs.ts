import { registry } from "@/registry/index";

export interface DocsSidebarItem {
  title: string;
  href: string;
}

export interface DocsSidebarSection {
  label: string;
  items: DocsSidebarItem[];
}

export function getDocsNavigation(): DocsSidebarSection[] {
  const components = registry.filter((item) => item.type === "components:ui");

  const buttons = components
    .filter((c) => c.tags.includes("button"))
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
    }));

  const cards = components
    .filter((c) => c.tags.includes("card"))
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
    }));

  const blocks = components
    .filter((c) => 
      !c.tags.includes("button") && 
      !c.tags.includes("card")
    )
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
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
  ];
}
