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
        dependencies: ["react", "motion", "react-icons", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
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
        registryDependencies: [],
        tags: ["card", "animation", "gradient", "neomorphism", "frost"],
        files: [
            "registry/components/gradient-ring-card.tsx",
        ],
        type: "components:ui",
        props: []
    },
    {
        name: "ai-input",
        title: "AI Input",
        description: "A ChatGPT-style AI prompt input with model selector dropdown, attach/globe action buttons, and voice input.",
        dependencies: ["react-icons"],
        registryDependencies: [],
        tags: ["input", "ai", "chatgpt", "dropdown"],
        files: [
            "registry/components/ai-input.tsx",
        ],
        type: "components:ui",
        props: []
    },
    {
        name: "ai-input-02",
        title: "AI Input 02",
        description: "A premium AI input sitting on a solid footer. Features real-time audio visualization, floating input card, and app-tools drawer.",
        dependencies: ["motion", "react-icons", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
        tags: ["input", "ai", "audio-visualizer", "gradient"],
        files: [
            "registry/components/ai-input-02.tsx",
        ],
        type: "components:ui",
        size: "lg",
        props: []
    },
    {
        name: "stack-card",
        title: "Stack Card",
        description: "A premium stack of cards with alternating content orientations and a glassmorphism backdrop. Cards smoothly rotate to the back continuously.",
        dependencies: ["motion", "clsx", "tailwind-merge"],
        registryDependencies: [],
        tags: ["card", "stack", "carousel", "glassmorphism"],
        files: [
            "registry/components/stack-card.tsx",
        ],
        type: "components:ui",
        props: []
    },
    {
        name: "command-palette",
        title: "Command Palette",
        description: "A Cmd+K command palette modal with fuzzy search, keyboard navigation, and recent items. Scales and fades in.",
        dependencies: ["motion", "react-icons", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
        tags: ["modal", "command", "palette", "search", "keyboard"],
        files: [
            "registry/components/command-palette.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "open", type: "boolean", default: "false", description: "Controlled open state of the modal." },
            { name: "onOpenChange", type: "function", default: "-", description: "Callback when open state changes." },
            { name: "actions", type: "ActionItem[]", default: "-", description: "List of actions to display." },
        ]
    },
    {
        name: "tweet-card",
        title: "Tweet Card",
        description: "A customizable Twitter tweet card component that exactly mimics the UI of a real tweet.",
        dependencies: ["react-icons", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
        tags: ["card", "tweet", "social", "twitter"],
        files: [
            "registry/components/tweet-card.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "authorName", type: "string", default: "-", description: "The author's display name." },
            { name: "authorUsername", type: "string", default: "-", description: "The author's username starting with @." },
            { name: "authorAvatar", type: "string", default: "-", description: "The URL to the author's avatar image." },
            { name: "verified", type: "boolean", default: "true", description: "Whether the author is verified." },
            { name: "content", type: "ReactNode", default: "-", description: "The text content of the tweet." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
        ]
    },
    {
        name: "pricing-plan",
        title: "Pricing Plan",
        description: "A three-tier pricing card with hover gradient + noise on the price zone, slot-machine price animation via motion/react, and a spring-animated monthly/yearly toggle pill.",
        dependencies: ["motion"],
        registryDependencies: [],
        tags: ["pricing", "block", "gradient", "animation", "noise", "slot-machine"],
        files: [
            "registry/components/pricing-plan.tsx",
        ],
        type: "components:ui",
        size: "lg",
        props: [
            { name: "tiers", type: "PricingTier[]", default: "TIERS", description: "Array of pricing tier objects. Each has name, monthlyPrice, yearlyPrice, description, cta, ctaVariant, features, accentA/B/C colours, and optional popular flag." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes applied to the wrapper." },
        ]
    },
    {
        name: "social-share-button",
        title: "Social Share Button",
        description: "A neomorphic pill button that reveals animated, clickable WhatsApp, Instagram, X, and Facebook icons on hover.",
        dependencies: ["motion", "react-icons"],
        registryDependencies: [],
        tags: ["button", "social", "neomorphism", "share", "hover", "animation"],
        files: [
            "registry/components/social-share-button.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "links", type: "SocialShareLinks", default: "{}", description: "Object containing URLs for whatsapp, instagram, x, and facebook keys." },
            { name: "label", type: "string", default: "'Share'", description: "Text shown in the default (non-hover) state." },
        ]
    },
    {
        name: "hero-section",
        title: "Hero Section",
        description: "A premium SaaS hero block with warm mesh gradients, parallax blobs, accent headline, dual CTAs, and a trusted-by logo rail.",
        dependencies: ["react"],
        registryDependencies: [],
        tags: ["block", "hero", "landing", "saas", "gradient"],
        files: [
            "registry/components/hero-section.tsx",
        ],
        type: "components:ui",
        size: "lg",
        props: [
            { name: "heading", type: "string", default: "'AI Workspace'", description: "Primary headline text (first line)." },
            { name: "accentText", type: "string", default: "'Creative Thinking'", description: "The accent-colored phrase in the headline." },
            { name: "subheading", type: "string", default: "-", description: "Descriptive paragraph below the headline." },
            { name: "primaryCta", type: "string", default: "'Try Aura Free'", description: "Label for the primary call-to-action button." },
            { name: "secondaryCta", type: "string", default: "'Watch Demo'", description: "Label for the secondary CTA button." },
            { name: "onPrimaryCta", type: "function", default: "-", description: "Click handler for the primary CTA." },
            { name: "onSecondaryCta", type: "function", default: "-", description: "Click handler for the secondary CTA." },
        ]
    },
];

