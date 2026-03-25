import React from "react";
import Navbar from "@/components/layout/Navbar";
import GlowFooter from "@/components/layout/GlowFooter";

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Coming Soon
          </h1>
          <p className="mt-4 text-muted-foreground">
            Our premium templates are currently in development. Stay tuned!
          </p>
        </div>
      </main>
      <GlowFooter />
    </div>
  );
}
