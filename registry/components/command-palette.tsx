"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSearch, FiCode, FiFileText, FiClock, FiSettings, FiUser, FiZap } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { cn } from "@/registry/utils";

// --- Types ---
export type ActionItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  group: string;
  perform: () => void;
  shortcut?: string[];
};

const defaultActions: ActionItem[] = [
  { id: "1", title: "Create new project...", icon: <FiCode />, group: "Actions", perform: () => console.log("New Project") },
  { id: "2", title: "Assign to team...", icon: <FiUser />, group: "Actions", perform: () => console.log("Assign") },
  { id: "3", title: "Open Settings", icon: <FiSettings />, group: "Pages", perform: () => console.log("Settings"), shortcut: ["⌘", "S"] },
  { id: "4", title: "Command Palette Docs", icon: <FiFileText />, group: "Docs", perform: () => console.log("Docs") },
  { id: "5", title: "Marquee Docs", icon: <FiFileText />, group: "Docs", perform: () => console.log("Marquee") },
  { id: "6", title: "Glow Button Docs", icon: <FiFileText />, group: "Docs", perform: () => console.log("Glow") },
];

const DEFAULT_RECENTS = ["3", "4", "1"];

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  actions?: ActionItem[];
}

export function CommandPalette({
  open: controlledOpen,
  onOpenChange,
  actions = defaultActions,
}: CommandPaletteProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Local storage fake for recent items
  const [recentIds, setRecentIds] = useState<string[]>(DEFAULT_RECENTS);

  // Cmd+K to open
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setSearch("");
      setSelectedIndex(0);
    }
  }, [open]);

  const filteredActions = useMemo(() => {
    if (!search.trim()) {
      const gStarted = actions.filter((a) => a.group === "Getting Started");
      const recents = actions.filter((a) => recentIds.includes(a.id) && a.group !== "Getting Started").slice(0, 3);
      
      const res = [];
      if (gStarted.length > 0) res.push({ group: "Getting Started", items: gStarted });
      if (recents.length > 0) res.push({ group: "Recent", items: recents });
      
if (res.length === 1 && res[0].group === "Getting Started") {
        res.push({ group: "Components", items: actions.filter(a => a.group === "Components").slice(0, 3) });
      }
      
      return res;
    }

    const lowerSearch = search.toLowerCase();
    const matches = actions.filter((a) =>
      a.title.toLowerCase().includes(lowerSearch) || 
      a.group.toLowerCase().includes(lowerSearch)
    );

    // Grouping
    const groups: Record<string, ActionItem[]> = {};
    matches.forEach((item) => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    });

    return Object.entries(groups).map(([group, items]) => ({
      group,
      items,
    }));
  }, [search, actions, recentIds]);

  const flattenedItems = useMemo(() => {
    return filteredActions.flatMap((g) => g.items);
  }, [filteredActions]);
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Keyboard Navigation
  useEffect(() => {
    if (!open) return;
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % flattenedItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + flattenedItems.length) % flattenedItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = flattenedItems[selectedIndex];
        if (selected) {
          executeAction(selected);
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, flattenedItems, selectedIndex]);

  const executeAction = (action: ActionItem) => {
    action.perform();
    setOpen(false);
    
    if (!recentIds.includes(action.id)) {
      setRecentIds((prev) => [action.id, ...prev].slice(0, 5));
    } else {
          setRecentIds((prev) => [action.id, ...prev.filter(id => id !== action.id)]);
    }
  };

  return (
    <>
      {/* Default Trigger Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:shadow-lg active:scale-95"
        >
          <div className="flex items-center gap-2">
            <FiSearch className="h-4 w-4" />
            <span>Search commands...</span>
          </div>
          <div className="flex items-center gap-1.5 ml-4">
            <kbd className="flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted/50 px-1.5 font-sans text-[10px] font-medium text-muted-foreground">
              ⌘
            </kbd>
            <kbd className="flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted/50 px-1.5 font-sans text-[10px] font-medium text-muted-foreground">
              K
            </kbd>
          </div>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="fixed inset-0 bg-background/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl mx-4"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center border-b border-border px-4 py-3">
                <FiSearch className="h-5 w-5 text-muted-foreground mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground ml-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded border border-border bg-accent/50 font-medium">ESC</span>
                </div>
              </div>

              <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
                {flattenedItems.length === 0 ? (
                  <div className="py-14 text-center text-sm text-muted-foreground">
                    No results found for <span className="text-foreground">"{search}"</span>
                  </div>
                ) : (
                  filteredActions.map((group) => {
                    if (group.items.length === 0) return null;
                    return (
                      <div key={group.group} className="mb-4 last:mb-0">
                        <div className="mb-1.5 px-3 text-xs font-semibold text-muted-foreground">
                          {group.group}
                        </div>
                        <div className="space-y-1">
                          {group.items.map((item) => {
                            const index = flattenedItems.findIndex((i) => i.id === item.id);
                            const isSelected = index === selectedIndex;
                            return (
                              <div
                                key={item.id}
                                onClick={() => executeAction(item)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                className={cn(
                                  "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                                  isSelected
                                    ? "bg-accent text-accent-foreground"
                                    : "text-foreground hover:bg-accent/50"
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={cn(
                                    "flex items-center justify-center w-5 h-5",
                                    isSelected ? "text-primary" : "text-muted-foreground"
                                  )}>
                                    {item.icon}
                                  </span>
                                  {item.title}
                                </div>
                                {item.shortcut && (
                                  <div className="flex items-center gap-1">
                                    {item.shortcut.map((key) => (
                                      <span key={key} className="flex h-5 items-center justify-center rounded border border-border bg-background px-1.5 text-[10px] font-medium text-muted-foreground shadow-sm">
                                        {key}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
