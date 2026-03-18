"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { getDocsNavigation } from "@/config/docs";

export function DocsPager() {
  const pathname = usePathname();
  const sections = getDocsNavigation();

  // Flatten all items in order
  const allItems = sections.flatMap((s) => s.items);

  const currentIndex = allItems.findIndex((item) => item.href === pathname);
  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="flex items-center justify-between pt-10 mt-10 border-t border-border">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 duration-200" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground/60 mb-0.5">Previous</span>
            <span className="font-medium">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 text-right"
        >
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground/60 mb-0.5">Next</span>
            <span className="font-medium">{next.title}</span>
          </div>
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 duration-200" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
