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
  const componentItems: DocsSidebarItem[] = registry
    .filter((item) => item.type === "components:ui")
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
      label: "Components",
      items: componentItems,
    },
  ];
}
