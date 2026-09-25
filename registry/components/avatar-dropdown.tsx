"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Hexagon,
  Palette,
  Rocket,
  Command,
  Info,
  LogOut,
  ChevronRight,
  Sun,
  Moon,
  Monitor,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  hasSubmenu?: boolean;
  shortcut?: string;
  badge?: string;
  danger?: boolean;
  isSeparator?: boolean;
}

export interface AvatarDropdownProps {
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
    initials?: string;
    status?: "online" | "offline" | "away";
  };
  items?: MenuItem[];
  className?: string;
  dropdownClassName?: string;
  align?: "left" | "right";
  onSelect?: (itemId: string) => void;
}

const DEFAULT_ITEMS: MenuItem[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Hexagon },
  { id: "theme", label: "Theme", icon: Palette, hasSubmenu: true },
  { id: "upgrade", label: "Upgrade", icon: Rocket },
  { id: "sep-1", label: "", icon: User, isSeparator: true },
  { id: "shortcuts", label: "Keyboard shortcuts", icon: Command },
  { id: "help", label: "Help center", icon: Info },
  { id: "logout", label: "Log out", icon: LogOut, danger: true },
];

export function AvatarDropdown({
  user = {
    name: "Alex Morgan",
    email: "alex@example.com",
    avatarUrl:
      "https://i.pinimg.com/736x/69/19/50/691950418b1f99ef9a7c2b749786eec2.jpg",
    initials: "AM",
    status: "online",
  },
  items = DEFAULT_ITEMS,
  className,
  dropdownClassName,
  align = "right",
  onSelect,
}: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHoverId, setActiveHoverId] = useState<string | null>("profile");
  const [selectedTheme, setSelectedTheme] = useState<"system" | "dark" | "light">("dark");
  const [showThemeSubmenu, setShowThemeSubmenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowThemeSubmenu(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setShowThemeSubmenu(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleItemClick = (item: MenuItem) => {
    if (item.id === "theme") {
      setShowThemeSubmenu((prev) => !prev);
      return;
    }
    item.onClick?.();
    onSelect?.(item.id);
    setIsOpen(false);
    setShowThemeSubmenu(false);
  };

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      {/* Trigger: Avatar Image */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setShowThemeSubmenu(false);
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "relative group flex items-center justify-center rounded-full outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-zinc-400/50 dark:focus-visible:ring-white/40",
          isOpen ? "ring-2 ring-zinc-400/40 dark:ring-white/30 scale-95" : "hover:scale-105 active:scale-95"
        )}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-white/10 shadow-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name || "Avatar"}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              {user.initials || "U"}
            </span>
          )}
        </div>

        {/* Online status indicator */}
        {user.status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-950",
              user.status === "online" && "bg-emerald-500",
              user.status === "away" && "bg-amber-500",
              user.status === "offline" && "bg-zinc-400 dark:bg-zinc-500"
            )}
          />
        )}
      </button>

      {/* Dropdown Menu Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.94, y: -8, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className={cn(
              "absolute z-50 mt-2.5 w-64 rounded-2xl p-2",
              "bg-white dark:bg-[#161618] text-zinc-800 dark:text-zinc-200 shadow-xl dark:shadow-2xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-zinc-400/20 dark:shadow-black/60",
              "backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95 select-none",
              align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left",
              dropdownClassName
            )}
          >
            {/* Main Menu List */}
            <div className="space-y-0.5">
              {items.map((item) => {
                if (item.isSeparator) {
                  return (
                    <div
                      key={item.id}
                      className="my-1.5 h-px bg-zinc-200/80 dark:bg-zinc-800/80 mx-2"
                    />
                  );
                }

                const Icon = item.icon;
                const isHovered = activeHoverId === item.id;

                return (
                  <div key={item.id} className="relative">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveHoverId(item.id)}
                      onClick={() => handleItemClick(item)}
                      className={cn(
                        "group relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 outline-none",
                        item.danger
                          ? "text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          : "text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white"
                      )}
                    >
                      {/* Active / Hover Background Pill */}
                      {isHovered && (
                        <motion.div
                          layoutId="activeHoverPill"
                          className={cn(
                            "absolute inset-0 rounded-xl",
                            item.danger
                              ? "bg-red-500/10 border border-red-500/20"
                              : "bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/40"
                          )}
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}

                      {/* Active indicator bar on left side (as in reference image) */}
                      {isHovered && !item.danger && (
                        <motion.span
                          layoutId="activeLeftIndicator"
                          className="absolute left-1 top-2.5 bottom-2.5 w-0.5 rounded-full bg-zinc-900 dark:bg-white/90 shadow-sm"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}

                      {/* Left Side: Icon & Label */}
                      <div className="relative z-10 flex items-center gap-3">
                        <Icon
                          className={cn(
                            "w-4 h-4 transition-transform duration-200 group-hover:scale-110",
                            item.danger
                              ? "text-red-500 dark:text-red-400"
                              : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {/* Right Side: Chevron / Shortcut / Badge */}
                      <div className="relative z-10 flex items-center gap-2">
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50">
                            {item.badge}
                          </span>
                        )}
                        {item.shortcut && (
                          <span className="text-[11px] tracking-widest text-zinc-400 dark:text-zinc-500 font-mono">
                            {item.shortcut}
                          </span>
                        )}
                        {item.hasSubmenu && (
                          <ChevronRight
                            className={cn(
                              "w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200",
                              showThemeSubmenu
                                ? "rotate-90 text-zinc-800 dark:text-zinc-200"
                                : "group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                            )}
                          />
                        )}
                      </div>
                    </button>

                    {/* Submenu for Theme if expanded */}
                    {item.id === "theme" && showThemeSubmenu && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-7 pr-1 py-1 space-y-1"
                      >
                        {[
                          { id: "dark", label: "Dark", icon: Moon },
                          { id: "light", label: "Light", icon: Sun },
                          { id: "system", label: "System", icon: Monitor },
                        ].map((themeOpt) => {
                          const ThemeIcon = themeOpt.icon;
                          const isSelected = selectedTheme === themeOpt.id;

                          return (
                            <button
                              key={themeOpt.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTheme(themeOpt.id as any);
                                setShowThemeSubmenu(false);
                              }}
                              className={cn(
                                "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                isSelected
                                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <ThemeIcon className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                                <span>{themeOpt.label}</span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AvatarDropdown;
