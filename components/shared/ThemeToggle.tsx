"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const THEMES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
]

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-9 w-9 bg-background transition-colors">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-background p-1 min-w-[120px]"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="flex flex-col gap-1">
          {THEMES.map((t, idx) => (
            <DropdownMenuItem
              key={t.id}
              onClick={() => setTheme(t.id)}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="group relative z-10 cursor-pointer border-none bg-transparent outline-none focus:bg-transparent focus:text-inherit"
            >
              <span className={`relative z-20 transition-colors duration-200 ${
                hoveredIndex === idx ? "text-foreground font-medium" : "text-muted-foreground"
              }`}>
                {t.label}
              </span>
              
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="theme-hover-bg"
                  className="absolute inset-0 z-10 rounded-md bg-accent"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
