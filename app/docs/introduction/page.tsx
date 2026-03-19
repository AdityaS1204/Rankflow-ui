import { DocsPager } from "@/components/docs/DocsPager";

export default function IntroductionPage() {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <p className="text-sm text-muted-foreground mb-4">
        Docs / Getting Started /{" "}
        <span className="text-foreground font-medium">Introduction</span>
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
        Welcome to RankFlow UI
      </h1>
      <p className="text-xl font-semibold text-amber-500 mb-4">
        Outrank the Template.
      </p>
      <p className="text-lg text-muted-foreground mb-10">
        RankFlow UI is a premium, open-source component library engineered for
        new-gen startups, high-velocity agencies, and design engineers. We
        provide the building blocks for landing pages that feel custom-designed
        without the custom-design timeline.
      </p>

      <hr className="border-border mb-10" />

      {/* The Gap */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          The Gap in the Web
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          The modern web is stuck in two modes: Generic or Over-designed. You
          either end up with "Bootstrap-era" sameness that lacks personality, or
          identifiable components that make every site look exactly like the
          library they were pulled from. There is a missing middle ground for
          developers who have taste and need to move fast.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          RankFlow UI exists in that gap. It's for the startup that needs a premium
          look on a lean budget, the agency that must ship excellence every time,
          and the design engineer who wants to compose something original rather
          than just assemble something recognizable.
        </p>
      </section>

      {/* Philosophy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">
          Philosophy
        </h2>
        <div className="space-y-6">
          {[
            {
              title: "The Anti-Template Approach",
              body: "Components shouldn't be recognizable signatures of a library — they should be invisible foundations for your own brand. RankFlow is designed to be expressive yet neutral enough to disappear into your unique aesthetic.",
            },
            {
              title: "Copy & Own",
              body: "We don't believe in black-box dependencies. You get the full source code — no hidden abstractions, no locked-in APIs. You own the code the second you drop it into your project.",
            },
            {
              title: "Motion with Intent",
              body: "Interactions should feel physical, not just animated. By leveraging spring physics and intentional easing, every hover, transition, and entry feels weighted, responsive, and polished.",
            },
            {
              title: "Zero Lock-In",
              body: "RankFlow UI is built on the stack you already love: React, Tailwind CSS, and Framer Motion. No proprietary runtime, no mandatory theme provider. Just clean code that works with your existing workflow.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who built this */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
          Why I Built This
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I'm a developer and design engineer working at the intersection of
          engineering and high-end aesthetics. I created RankFlow UI because I saw
          a need for a library that wasn't just another UI kit.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          I wanted to build components that I actually wanted to use — pieces
          with noise textures, frosted glass rings, and dynamic spotlights that
          sit perfectly between minimalism and expressiveness. RankFlow UI is a
          reflection of my belief that every pixel matters and every transition
          should feel intentional.
        </p>
      </section>
      <DocsPager />
    </article>
  );
}
