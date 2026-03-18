import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ComponentsShowcase from "@/components/home/ComponentGrid";
import GlowFooter from "@/components/layout/GlowFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Decorative vertical lines */}
      <div className="pointer-events-none fixed inset-0 z-0 mx-auto max-w-7xl px-6">
        <div className="h-full w-full border-x border-border/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Navbar />
        
        <Hero />
        <div className="mx-auto h-px w-full bg-linear-to-r from-transparent via-border/50 to-transparent" />
        
        <ComponentsShowcase />
        <div className="mx-auto h-px w-full bg-linear-to-r from-transparent via-border/50 to-transparent" />
        <GlowFooter />
      </div>
    </main>
  );
}
