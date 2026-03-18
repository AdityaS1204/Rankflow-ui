export const registry = [
    {
        name: "animated-border",
        title: "Animated Border Button",
        description: "A button component with a moving gradient border animation using motion/react and CSS offset-path.",
        dependencies: ["motion"],
        registryDependencies: [],
        tags: ["button", "animation", "border", "gradient"],
        files: [
            "registry/animated-border.tsx",
        ],
        type: "components:ui",
    },
    {
        name: "spotlight-card",
        title: "Spotlight Card",
        description: "A card that follows the cursor with a radiant spotlight hover effect.",
        dependencies: ["react"],
        registryDependencies: [],
        tags: ["card", "interaction", "spotlight"],
        files: [
            "registry/spotlight-card.tsx",
        ],
        type: "components:ui",
    },
    {
        name: "noise-button",
        title: "Noise Button",
        description: "A pill-shaped button with canvas noise texture, frosted outer ring, and magic-wand icon.",
        dependencies: ["react", "@radix-ui/react-icons"],
        registryDependencies: [],
        tags: ["button", "noise", "texture", "frosted"],
        files: [
            "registry/noise-button.tsx",
        ],
        type: "components:ui",
    },
    {
        name: "glow-button",
        title: "Glow Button",
        description: "A button with a vibrant glow effect and customizable variants.",
        dependencies: ["react", "@radix-ui/react-icons"],
        registryDependencies: [],
        tags: ["button", "interaction", "glow", "neon"],
        files: [
            "registry/glow-button.tsx",
        ],
        type: "components:ui",
    },
    {
        name: "marquee",
        title: "Marquee",
        description: "A marquee component with hover to slow down the animation.",
        dependencies: ["react", "motion"],
        registryDependencies: [],
        tags: ["marquee"],
        files: [
            "registry/marquee.tsx",
        ],
        type: "components:ui",
    },
];
