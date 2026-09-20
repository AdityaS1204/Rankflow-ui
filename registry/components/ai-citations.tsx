"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Copy, Check, Globe, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CitationItem {
  /**
   * Unique identifier or 1-based index number for the citation.
   */
  id: string | number;
  /**
   * Full target URL of the cited reference.
   */
  url: string;
  /**
   * Title or headline of the source page/document.
   */
  title: string;
  /**
   * Optional excerpt or relevant snippet text extracted from the source.
   */
  snippet?: string;
  /**
   * Optional site or provider name (e.g. "Wikipedia", "MDN Web Docs", "GitHub").
   */
  siteName?: string;
  /**
   * Optional custom favicon URL. If omitted, automatically derived from domain.
   */
  favicon?: string;
  /**
   * Optional publication or access date string.
   */
  date?: string;
}

export interface AICitationsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of citation sources to render in the sources section.
   */
  sources: CitationItem[];
  /**
   * Custom title for the sources section.
   * @default "Sources"
   */
  title?: string;
  /**
   * Display layout variant for the citations.
   * - `grid`: Standard 2-3 column card grid below text.
   * - `list`: Vertical card list below text.
   * - `pills`: Compact favicon pill chips below text.
   * - `popover`: Interactive hover popover card on inline citation numbers.
   * @default "grid"
   */
  variant?: "grid" | "list" | "pills" | "popover";
  /**
   * Currently highlighted or active source ID (for synchronization with inline citations).
   */
  activeId?: string | number | null;
  /**
   * Callback fired when hovering over a source item.
   */
  onSourceHover?: (id: string | number | null) => void;
  /**
   * Callback fired when clicking a source item.
   */
  onSourceClick?: (source: CitationItem) => void;
  /**
   * Maximum character length for trimmed link display.
   * @default 32
   */
  maxUrlLength?: number;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

export interface InlineCitationProps {
  source: CitationItem;
  index?: number;
  showHoverCard?: boolean;
  onHover?: (isHovered: boolean) => void;
  onClick?: () => void;
  className?: string;
}


export function formatTrimmedUrl(rawUrl: string, maxLength: number = 32): string {
  try {
    const urlObj = new URL(rawUrl);
    let domain = urlObj.hostname.replace(/^www\./, "");
    let path = urlObj.pathname + urlObj.search;

    if (path === "/") path = "";

    const fullClean = `${domain}${path}`;
    if (fullClean.length <= maxLength) {
      return fullClean;
    }

    const pathSegments = urlObj.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 1) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      const trimmedCandidate = `${domain}/.../${lastSegment}`;
      if (trimmedCandidate.length <= maxLength + 8) {
        return trimmedCandidate;
      }
    }

    return fullClean.slice(0, maxLength - 3) + "...";
  } catch {
    const clean = rawUrl.replace(/^https?:\/\/(www\.)?/, "");
    return clean.length > maxLength ? clean.slice(0, maxLength - 3) + "..." : clean;
  }
}

export function getFaviconUrl(url: string, customFavicon?: string): string {
  if (customFavicon) return customFavicon;
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
}


export function SiteFavicon({
  url,
  customFavicon,
  siteName,
  className,
}: {
  url: string;
  customFavicon?: string;
  siteName?: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const src = getFaviconUrl(url, customFavicon);

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "w-4 h-4 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shrink-0 text-neutral-500 dark:text-neutral-400 text-[9px] font-medium uppercase",
          className
        )}
        title={siteName || "Source site"}
      >
        {siteName ? siteName[0] : <Globe className="w-2.5 h-2.5" />}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={siteName || "Favicon"}
      onError={() => setHasError(true)}
      className={cn("w-4 h-4 rounded-xs shrink-0 object-contain", className)}
      loading="lazy"
    />
  );
}

export function InlineCitation({
  source,
  index,
  showHoverCard = false,
  onHover,
  onClick,
  className,
}: InlineCitationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const displayNum = index !== undefined ? index : source.id;
  const trimmedUrl = formatTrimmedUrl(source.url, 28);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else {
      window.open(source.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <span className="relative inline-block mx-0.5 align-baseline">
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center h-4.5 min-w-4.5 px-1.5 rounded-full text-[11px] font-mono font-medium leading-none tracking-tight",
          "bg-neutral-200/70 hover:bg-neutral-300/80 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/90",
          "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white",
          "border border-neutral-300/40 dark:border-neutral-700/50 transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 cursor-pointer",
          className
        )}
        aria-label={`Citation [${displayNum}]: ${source.title}`}
      >
        [{displayNum}]
      </button>

      <AnimatePresence>
        {showHoverCard && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              opacity: 0,
              y: 4,
              scale: 0.97,
              transition: { duration: 0.12, ease: [0.16, 1, 0.3, 1] },
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-72 p-3 rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 shadow-xl shadow-neutral-900/10 dark:shadow-black/50 text-left pointer-events-auto"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <SiteFavicon url={source.url} customFavicon={source.favicon} siteName={source.siteName} />
                <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
                  {source.siteName || new URL(source.url).hostname.replace(/^www\./, "")}
                </span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500">
                [{displayNum}]
              </span>
            </div>

            <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug mb-1">
              {source.title}
            </h4>

            {source.snippet && (
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-2">
                "{source.snippet}"
              </p>
            )}

            <div className="pt-1.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
              <span className="text-[10.5px] font-mono text-neutral-400 dark:text-neutral-500 truncate max-w-[170px]">
                {trimmedUrl}
              </span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                <span>Visit</span>
                <ExternalLink className="w-3 h-3 stroke-2" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

/**
 * Single Citation Card for the sources list.
 */
export function AICitationCard({
  source,
  index,
  isActive = false,
  maxUrlLength = 32,
  onHover,
  onClick,
}: {
  source: CitationItem;
  index: number;
  isActive?: boolean;
  maxUrlLength?: number;
  onHover?: (hovered: boolean) => void;
  onClick?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const trimmedUrl = formatTrimmedUrl(source.url, maxUrlLength);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(source.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      onClick={() => {
        if (onClick) onClick();
        else window.open(source.url, "_blank", "noopener,noreferrer");
      }}
      className={cn(
        "group relative flex flex-col justify-between p-3 rounded-xl border transition-all duration-200 ease-out cursor-pointer select-none",
        "bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xs",
        isActive
          ? "border-neutral-400 dark:border-neutral-600 shadow-md shadow-neutral-950/5 ring-1 ring-neutral-400/30 dark:ring-neutral-600/30"
          : "border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50/80 dark:hover:bg-neutral-850/80 hover:shadow-xs"
      )}
    >
      <div>
        {/* Header: Favicon + Domain/Site + Index Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <SiteFavicon url={source.url} customFavicon={source.favicon} siteName={source.siteName} />
            <span className="text-[11.5px] font-medium text-neutral-600 dark:text-neutral-400 truncate">
              {source.siteName || new URL(source.url).hostname.replace(/^www\./, "")}
            </span>
          </div>

          <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10.5px] font-mono font-medium text-neutral-500 dark:text-neutral-400">
            {index}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-[12.5px] font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white line-clamp-2 leading-snug transition-colors mb-1.5">
          {source.title}
        </h4>

        {/* Optional Snippet preview */}
        {source.snippet && (
          <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-3">
            {source.snippet}
          </p>
        )}
      </div>

      {/* Footer: Trimmed URL link & Copy button */}
      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500">
        <span className="font-mono truncate max-w-[180px] group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" title={source.url}>
          {trimmedUrl}
        </span>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={handleCopy}
            title="Copy URL"
            className="p-1 rounded-md hover:bg-neutral-200/70 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500 stroke-[2.5]" /> : <Copy className="w-3 h-3" />}
          </button>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Open in new tab"
            className="p-1 rounded-md hover:bg-neutral-200/70 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Sources Component for displaying citations beneath AI response text.
 * Supports variants: "grid", "list", "pills", and "popover".
 */
export function AICitations({
  sources = [],
  title = "Sources",
  variant = "grid",
  activeId,
  onSourceHover,
  onSourceClick,
  maxUrlLength = 32,
  className,
  ...props
}: AICitationsProps) {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  if (!sources || sources.length === 0) return null;

  const currentActiveId = activeId !== undefined ? activeId : hoveredId;

  return (
    <div className={cn("w-full pt-4 mt-4 border-t border-neutral-200/70 dark:border-neutral-800/80", className)} {...props}>
      {/* Sources Section Header */}
      <div className="flex items-center justify-between mb-3 select-none">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
          <h3 className="text-sm font-semibold tracking-tight text-neutral-600 dark:text-neutral-400">
            {title}
          </h3>
          <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-medium">
            {sources.length}
          </span>
        </div>
      </div>

      {/* Render Layout Variants */}
      {variant === "pills" ? (
        <div className="flex flex-wrap gap-2">
          {sources.map((source, i) => {
            const index = i + 1;
            const isActive = currentActiveId === source.id || currentActiveId === index;

            return (
              <a
                key={source.id || i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setHoveredId(source.id);
                  onSourceHover?.(source.id);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  onSourceHover?.(null);
                }}
                onClick={(e) => {
                  if (onSourceClick) {
                    e.preventDefault();
                    onSourceClick(source);
                  }
                }}
                className={cn(
                  "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ease-out select-none",
                  "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xs",
                  isActive
                    ? "border-neutral-400 dark:border-neutral-600 text-neutral-900 dark:text-white shadow-xs"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200"
                )}
              >
                <span className="text-[10.5px] font-mono text-neutral-400 dark:text-neutral-500 font-normal">
                  [{index}]
                </span>
                <SiteFavicon url={source.url} customFavicon={source.favicon} siteName={source.siteName} />
                <span className="truncate max-w-[140px] font-medium">{source.title}</span>
              </a>
            );
          })}
        </div>
      ) : variant === "list" ? (
        <div className="flex flex-col gap-2">
          {sources.map((source, i) => {
            const index = i + 1;
            const isActive = currentActiveId === source.id || currentActiveId === index;

            return (
              <AICitationCard
                key={source.id || i}
                source={source}
                index={index}
                isActive={isActive}
                maxUrlLength={maxUrlLength}
                onHover={(hovered) => {
                  const targetId = hovered ? source.id : null;
                  setHoveredId(targetId);
                  onSourceHover?.(targetId);
                }}
                onClick={() => onSourceClick?.(source)}
              />
            );
          })}
        </div>
      ) : variant === "popover" ? (
        /* Popover variant footer display: clean interactive pills */
        <div className="flex flex-wrap gap-2">
          {sources.map((source, i) => {
            const index = i + 1;
            const isActive = currentActiveId === source.id || currentActiveId === index;

            return (
              <a
                key={source.id || i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setHoveredId(source.id);
                  onSourceHover?.(source.id);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  onSourceHover?.(null);
                }}
                onClick={(e) => {
                  if (onSourceClick) {
                    e.preventDefault();
                    onSourceClick(source);
                  }
                }}
                className={cn(
                  "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ease-out select-none",
                  "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xs",
                  isActive
                    ? "border-neutral-400 dark:border-neutral-600 text-neutral-900 dark:text-white shadow-xs"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200"
                )}
              >
                <span className="text-[10.5px] font-mono text-neutral-400 dark:text-neutral-500 font-normal">
                  [{index}]
                </span>
                <SiteFavicon url={source.url} customFavicon={source.favicon} siteName={source.siteName} />
                <span className="truncate max-w-[140px] font-medium">{source.title}</span>
              </a>
            );
          })}
        </div>
      ) : (
        /* Default "grid" layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {sources.map((source, i) => {
            const index = i + 1;
            const isActive = currentActiveId === source.id || currentActiveId === index;

            return (
              <AICitationCard
                key={source.id || i}
                source={source}
                index={index}
                isActive={isActive}
                maxUrlLength={maxUrlLength}
                onHover={(hovered) => {
                  const targetId = hovered ? source.id : null;
                  setHoveredId(targetId);
                  onSourceHover?.(targetId);
                }}
                onClick={() => onSourceClick?.(source)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AICitations;
