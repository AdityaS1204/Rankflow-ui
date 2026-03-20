export const registry = [
    {
        name: "utils",
        title: "Utils",
        description: "Shared utility functions for Rankflow UI (cn, etc).",
        dependencies: ["clsx", "tailwind-merge"],
        registryDependencies: [],
        tags: ["utils", "shared"],
        files: [
            "registry/utils.ts",
        ],
        type: "components:lib",
    },
    {
        name: "animated-border",
        title: "Animated Border Button",
        description: "A button component with a moving gradient border animation using motion/react and CSS offset-path.",
        dependencies: ["motion", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
        tags: ["button", "animation", "border", "gradient"],
        files: [
            "registry/components/animated-border.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "children", type: "ReactNode", default: "-", description: "The content of the button." },
            { name: "duration", type: "number", default: "2", description: "The duration of the border animation in seconds." },
            { name: "borderWidth", type: "number", default: "2", description: "The width of the animated border." },
            { name: "borderRadius", type: "string", default: "12px", description: "The border radius of the button." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
        ]
    },
    {
        name: "spotlight-card",
        title: "Spotlight Card",
        description: "A premium card component with a dynamic spotlight effect that follows the mouse cursor.",
        dependencies: ["react"],
        registryDependencies: [],
        tags: ["card", "interaction", "spotlight"],
        files: [
            "registry/components/spotlight-card.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "children", type: "ReactNode", default: "null", description: "The content of the card." },
            { name: "color", type: "string", default: "#3b82f6", description: "The color of the spotlight effect." },
            { name: "border", type: "string", default: "#262626", description: "The border color." },
            { name: "spotlightSize", type: "number", default: "600", description: "The radius of the spotlight effect." },
            { name: "width", type: "string | number", default: "100%", description: "The width of the card." },
            { name: "height", type: "string | number", default: "auto", description: "The height of the card." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
        ]
    },
    {
        name: "noise-button",
        title: "Noise Button",
        description: "A pill-shaped button with canvas noise texture, frosted outer ring, and magic-wand icon.",
        dependencies: ["react", "@radix-ui/react-icons"],
        registryDependencies: [],
        tags: ["button", "noise", "texture", "frosted"],
        files: [
            "registry/components/noise-button.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "children", type: "ReactNode", default: "-", description: "The text content." },
            { name: "onClick", type: "function", default: "-", description: "Event handler for click." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
        ]
    },
    {
        name: "glow-button",
        title: "Glow Button",
        description: "A button with a vibrant glow effect and customizable variants.",
        dependencies: ["react", "@radix-ui/react-icons"],
        registryDependencies: [],
        tags: ["button", "interaction", "glow", "neon"],
        files: [
            "registry/components/glow-button.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "children", type: "ReactNode", default: "-", description: "The button text." },
            { name: "variant", type: "orange | red | blue | green", default: "orange", description: "The color theme of the button." },
            { name: "disableChevron", type: "boolean", default: "false", description: "Whether to hide the double chevron icon." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
        ]
    },
    {
        name: "marquee",
        title: "Marquee",
        description: "A marquee component with hover to slow down the animation.",
        dependencies: ["react", "motion", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
        tags: ["marquee"],
        files: [
            "registry/components/marquee.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "children", type: "ReactNode", default: "-", description: "The content to scroll." },
            { name: "direction", type: "left | right", default: "left", description: "The scroll direction." },
            { name: "speed", type: "number", default: "20", description: "The speed of the animation." },
            { name: "pauseOnHover", type: "boolean", default: "true", description: "Whether to pause the animation on hover." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
        ]
    },
    {
        name: "gradient-button",
        title: "Gradient Button",
        description: "A button with a continuously moving random gradient that expands on hover.",
        dependencies: ["react", "motion", "@radix-ui/react-icons"],
        registryDependencies: [],
        tags: ["button", "interaction", "gradient", "hover"],
        files: [
            "registry/components/gradient-button.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "children", type: "ReactNode", default: "-", description: "The button text." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
        ]
    },
    {
        name: "sign-up-form",
        title: "Sign Up Form",
        description: "A two-pane sign-up block component with a masked testimonial carousel.",
        dependencies: ["react", "motion", "react-icons"],
        registryDependencies: [],
        tags: ["block", "authentication", "form", "carousel"],
        files: [
            "registry/components/sign-up-form.tsx",
        ],
        type: "components:ui",
        size: "lg",
        props: [
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
        ]
    },
    {
        name: "gradient-ring-card",
        title: "Gradient Ring Card",
        description: "A card component with a frosted glass outer ring and a continuously rotating conic gradient, giving a neomorphic shadow depth between the ring and the card surface.",
        dependencies: ["react"],
        registryDependencies: ["utils"],
        tags: ["card", "animation", "gradient", "neomorphism", "frost"],
        files: [
            "registry/components/gradient-ring-card.tsx",
        ],
        type: "components:ui",
        props: []
    },
];

