"use client";

import React from "react";
import { cn } from "@/lib/utils";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FOOTER_LINKS = [
  {
    heading: "Features",
    links: [
      { label: "API", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Docs", href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Account", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <YoutubeIcon />, href: "#", label: "YouTube" },
  { icon: <FacebookIcon />, href: "#", label: "Facebook" },
  { icon: <TwitterIcon />, href: "#", label: "Twitter / X" },
  { icon: <LinkedinIcon />, href: "#", label: "LinkedIn" },
];

export interface Footer001Props {
  logoName?: string;
  tagline?: string;
  className?: string;
}

export function Footer001({
  logoName = "Luminary.io",
  tagline = "Your go-to platform for web development tools and insights.",
  className,
}: Footer001Props) {
  return (
    <footer className={cn("w-full bg-background px-3 py-5 sm:px-4 sm:py-6 md:px-6", className)}>
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <div className="rounded-xl border border-border bg-muted/30 px-4 py-6 sm:rounded-2xl sm:px-6 sm:py-8 md:px-10 md:py-10 dark:bg-zinc-900/40">

          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:justify-between">

            {/* Left — Logo, tagline, socials */}
            <div className="flex flex-col gap-4 sm:gap-5 lg:max-w-xs">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="text-base font-bold tracking-tight text-foreground">
                  {logoName}
                </span>
              </div>

              {/* Tagline */}
              <p className="max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {tagline}
              </p>

              {/* Socials */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Link columns */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-6 md:gap-10">
              {FOOTER_LINKS.map((col, index) => (
                <div
                  key={col.heading}
                  className={cn(
                    "flex flex-col gap-2.5 sm:gap-3",
                    index === FOOTER_LINKS.length - 1 && "col-span-2 sm:col-span-1"
                  )}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                    {col.heading}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-8 border-t border-border pt-5 sm:mt-10 sm:pt-6">
            <p className="text-center text-[11px] text-muted-foreground sm:text-left sm:text-xs">
              © {new Date().getFullYear()} {logoName}. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
