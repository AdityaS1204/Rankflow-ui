import { GlowButton } from "./components/glow-button";
import { AnimatedBorderButton } from "./components/animated-border";
import { SpotlightCard } from "./components/spotlight-card";
import { NoiseButton } from "./components/noise-button";
import { Marquee } from "./components/marquee";

export const registryComponents: Record<string, any> = {
  "glow-button": GlowButton,
  "animated-border": AnimatedBorderButton,
  "spotlight-card": SpotlightCard,
  "noise-button": NoiseButton,
  "marquee": Marquee,
};
