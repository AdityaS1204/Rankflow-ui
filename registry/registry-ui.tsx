import { GlowButton } from "./components/glow-button";
import { AnimatedBorderButton } from "./components/animated-border";
import { SpotlightCard } from "./components/spotlight-card";
import { NoiseButton } from "./components/noise-button";
import { Marquee } from "./components/marquee";
import { GradientButton } from "./components/gradient-button";
import { SignUpForm } from "./components/sign-up-form";
import { GradientRingCard } from "./components/gradient-ring-card";
import { AiInput } from "./components/ai-input";
import { StackCard } from "./components/stack-card";
import { CommandPalette } from "./components/command-palette";
import { TweetCard } from "./components/tweet-card";
import { PricingPlan } from "./components/pricing-plan";
import { SocialShareButton } from "./components/social-share-button";
import { HeroSection } from "./components/hero-section";
import { AiInput02 } from "./components/ai-input-02";
import { DotGridBackground } from "./components/dot-grid-background";
import { ScrollVelocity } from "./components/scroll-velocity";
import { TextGenerateEffect } from "./components/text-generate-effect";

export const registryComponents: Record<string, any> = {
  "glow-button": GlowButton,
  "animated-border": AnimatedBorderButton,
  "spotlight-card": SpotlightCard,
  "noise-button": NoiseButton,
  "marquee": Marquee,
  "gradient-button": GradientButton,
  "sign-up-form": SignUpForm,
  "gradient-ring-card": GradientRingCard,
  "ai-input": AiInput,
  "stack-card": StackCard,
  "command-palette": CommandPalette,
  "tweet-card": TweetCard,
  "pricing-plan": PricingPlan,
  "social-share-button": SocialShareButton,
  "hero-section": HeroSection,
  "ai-input-02": AiInput02,
  "dot-grid-background": DotGridBackground,
  "scroll-velocity": ScrollVelocity,
  "text-generate-effect": TextGenerateEffect,
};
