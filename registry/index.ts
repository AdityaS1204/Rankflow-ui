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
];
