"use client"

import * as React from "react"
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button className="h-9 w-9 bg-transparent opacity-0" />
    )
  }

  return (
    <button
      className="h-9 w-9 bg-transparent hover:bg-accent transition-colors overflow-hidden rounded-md flex items-center justify-center"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <div className="relative w-4 h-4">
        {resolvedTheme === "dark" ? (
          <FiSun className="h-full w-full text-foreground transition-all scale-110" />
        ) : (
          <FiMoon className="h-full w-full text-foreground transition-all scale-110" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
