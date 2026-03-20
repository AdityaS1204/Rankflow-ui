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
};
