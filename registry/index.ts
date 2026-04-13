import { BrutalistKey } from "./components/brutalist-key";

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
        desktopOnly: true,
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
        desktopOnly: true,
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
    {
        name: "dot-grid-background",
        title: "Dot Grid Background",
        isNew: true,
        description: "A premium fullscreen background inspired by the Miracle UI. Features a dense grid of randomly blinking dots with an interactive cursor-follow lighting effect.",
        dependencies: ["react", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
        tags: ["backgrounds", "canvas", "grid", "blinking", "animation"],
        files: [
            "registry/components/dot-grid-background.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "dotSize", type: "number", default: "1.2", description: "The radius of each dot in pixels." },
            { name: "gap", type: "number", default: "12", description: "The grid spacing between dots (lower = higher density)." },
            { name: "blinkProbability", type: "number", default: "0.005", description: "Chance of a dot starting to blink [0, 1]." },
            { name: "blinkSpeed", type: "number", default: "0.05", description: "Interpolation speed of the opacity transition." },
            { name: "cursorRadius", type: "number", default: "100", description: "Radius around the cursor where dots light up." },
            { name: "cursorStrength", type: "number", default: "0.5", description: "Maximum additional opacity from cursor proximity." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
        ]
    },
    {
        name: "scroll-velocity",
        title: "Scroll Velocity",
        isNew: true,
        description: "A text component that moves with the scroll velocity.",
        dependencies: ["react"],
        registryDependencies: [],
        tags: ["block", "interaction", "text"],
        files: [
            "registry/components/scroll-velocity.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "texts", type: "string[]", default: "['Rankflow UI is a react component library', 'Rankflow UI is a react component library']", description: "Array of texts to display." },
            { name: "baseVelocity", type: "number", default: "1", description: "Base velocity of the text." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
            { name: "textClassName", type: "string", default: "''", description: "Additional CSS classes for the text." },
        ]
    },
    {
        name: "text-generate-effect",
        title: "Text Generate Effect",
        isNew: true,
        description: "A text component with a blur effect when it comes into view.",
        dependencies: ["react"],
        registryDependencies: [],
        tags: ["block", "interaction", "text"],
        files: [
            "registry/components/text-generate-effect.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "text", type: "string", default: "'If you clean a vacuum cleaner, you become a vacuum cleaner'", description: "The text to display." },
            { name: "children", type: "string", default: "'If you clean a vacuum cleaner, you become a vacuum cleaner'", description: "The text to display." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." },
            { name: "delay", type: "number", default: "0", description: "Delay before the animation starts." },
            { name: "wordDelay", type: "number", default: "0", description: "Delay between words." },
            { name: "once", type: "boolean", default: "true", description: "Whether the animation should only play once." },
        ]
    },
    {
        name: "parallax-text",
        title: "Parallax Text",
        isNew: true,
        description: "A parallax text effect component with multiple vibrant layers that react to cursor movement.",
        dependencies: ["motion"],
        registryDependencies: ["utils"],
        tags: ["text", "parallax", "interaction", "animation"],
        files: [
            "registry/components/parallax-text.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "text", type: "string", default: "'Rankflow UI'", description: "The text to display." },
            { name: "layers", type: "number", default: "5", description: "Number of text layers to generate." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." }
        ]
    },
    {
        name: "pixel-fall-effect",
        title: "Pixel Fall Effect",
        isNew: true,
        description: "A card component where an interactive pixelated screen shatters and falls down on hover, revealing an underlying vibrant color.",
        dependencies: ["react", "lucide-react"],
        registryDependencies: ["utils"],
        tags: ["card", "canvas", "animation", "interaction", "pixel"],
        files: [
            "registry/components/pixel-fall-effect.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "direction", type: "string", default: "'down'", description: "The direction of the pixel fall." },
            { name: "defaultColor", type: "string", default: "'#2563eb'", description: "The color of the canvas layer." },
            { name: "hoverColor", type: "string", default: "'#ef4444'", description: "The background color revealed on hover." },
            { name: "pixelSize", type: "number", default: "16", description: "The size of each falling pixel block." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes." }
        ]
    },
    {
        name: "ai-input-03",
        title: "AI Input 03",
        isNew: true,
        description: "A clean, light-themed AI input mimicking a premium dashboard interface. Features uploaded drafts preview, auto-expanding textarea, and a segmented control toolbar for image/video generation.",
        dependencies: ["react", "lucide-react", "motion", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
        tags: ["input", "ai", "dashboard", "drafts", "clean"],
        files: [
            "registry/components/ai-input-03.tsx",
        ],
        type: "components:ui",
        desktopOnly: true,
        props: []
    },
    {
        name: "text-reveal",
        title: "Text Reveal",
        isNew: true,
        description: "A bold text component that smoothly reveals words based on scroll position.",
        dependencies: ["react", "motion"],
        registryDependencies: ["utils"],
        tags: ["text", "scroll", "animation", "reveal"],
        files: [
            "registry/components/text-reveal.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "text", type: "string", default: "'If you clean a vacuum cleaner, you become a vacuum cleaner'", description: "The text content to be revealed." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes for the container." }
        ]
    },
    {
        name: "expandable-cards",
        title: "Expandable Cards",
        isNew: true,
        description: "A group of vertical cards that expand smoothly on hover using Framer Motion layout animations. Perfect for displaying featured collections or portfolio categories.",
        dependencies: ["motion", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
        tags: ["card", "interaction", "stock-images", "expandable"],
        files: [
            "registry/components/expandable-cards.tsx",
        ],
        type: "components:ui",
        size: "lg",
        props: [
        { name: "cards", type: "Card[]", default: "DEFAULT_CARDS", description: "Array of card objects with id, title, image, and description." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes for the container." }
        ]
    },
    {
        name: "drawing-cursor",
        title: "Drawing Cursor",
        isNew: true,
        description: "A premium background component where the mouse cursor draws a fading pencil-like line on a canvas. Supports touch and smooth opacity fading.",
        dependencies: ["react", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
        tags: ["backgrounds", "canvas", "cursor", "animation", "draw"],
        files: [
            "registry/components/drawing-cursor.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "lineColor", type: "string", default: "'#b6eb00'", description: "Color of the drawn line." },
            { name: "lineWidth", type: "number", default: "2", description: "Width of the pencil stroke." },
            { name: "fadeDuration", type: "number", default: "1000", description: "Duration in ms for the drawn path to disappear." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes for the wrapper." }
        ]
    },
    {
        name: "file-upload",
        title: "File Upload",
        isNew: true,
        description: "A premium file upload block component with drag-and-drop support, file type automatic detection, and smooth micro-animations for adding/removing files.",
        dependencies: ["motion", "lucide-react", "clsx", "tailwind-merge"],
        registryDependencies: ["utils"],
        tags: ["block", "upload", "interaction", "files", "animation"],
        files: [
            "registry/components/file-upload.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "className", type: "string", default: "''", description: "Additional CSS classes for the wrapper." }
        ]
    },
    {
        name: "accordion",
        title: "Accordion",
        isNew: true,
        description: "Accordion component with smooth animations",
        dependencies: ["react"],
        registryDependencies: [],
        tags: ["block", "accordion","interaction", "animation"],
        files: [
            "registry/components/accordion.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "items", type: "AccordionItem[]", default: "DEFAULT_ITEMS", description: "Array of accordion items, each with id, question, and answer fields." },
            { name: "allowMultiple", type: "boolean", default: "false", description: "Whether multiple accordion items can be open at the same time." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes for the accordion wrapper." },
        ]
    },
    {
        name:"brutalist-key",
        title:"Brutalist Key",
        isNew:true,
        description:"A brutalist key component with a unique design.",
        dependencies:["react"],
        registryDependencies:[],
        tags:["button","key","brutalist"],
        files:[
            "registry/components/brutalist-key.tsx",
        ],
        type:"components:ui",
        props:[
            { name: "children", type: "ReactNode", default: "-", description: "The content of the key." },
            { name: "className", type: "string", default: "''", description: "Additional CSS classes for the key." },
        ]
    },
    {
        name: "ecosystem-hero",
        title: "Ecosystem Hero",
        isNew: true,
        description: "A premium hero section with fractal wall background, 3D buttons, and floating app icons.",
        dependencies: ["react", "motion", "lucide-react", "react-icons"],
        registryDependencies: [],
        tags: ["hero", "block", "landing", "3d", "fractal"],
        files: [
            "registry/components/ecosystem-hero.tsx",
        ],
        type: "components:ui",
        size:"lg",
        fullScreenPreview: true,
        props: []
    },
    {
        name: "bento-grid-001",
        title: " Bento Grid 001",
        isNew: true,
        description: "An interactive bento grid Layout of color palettes with fluid resizing layout animations. You can use it for your next bento grid layout.",
        dependencies: ["react", "motion", "lucide-react"],
        registryDependencies: ["utils"],
        tags: ["grid", "bento", "layout", "cards", "colors"],
        files: [
            "registry/components/bento-grid-001.tsx",
        ],
        type: "components:ui",
        size:"lg",
        props: []
    },
     {
        name: "product-showcase-card",
        title: "Product Showcase Card",
        isNew: true,
        description: "A premium product card with an integrated image carousel, fluid pill indicators, and a bookmark action.",
        dependencies: ["react", "motion", "lucide-react"],
        registryDependencies: ["utils"],
        tags: ["product", "ecommerce", "card", "carousel", "store"],
        files: [
            "registry/components/product-showcase-card.tsx",
        ],
        type: "components:ui",
        props: [
            { name: "title", type: "string", default: "'Nike Air Max 270'", description: "The product title." },
            { name: "subtitle", type: "string", default: "'Men's Everyday Sneakers...'", description: "The short description or features subtitle." },
            { name: "price", type: "string", default: "'$150'", description: "The price string." },
            { name: "images", type: "string[]", default: "Unsplash Array", description: "Array of image URLs for the carousel." },
            { name: "className", type: "string", default: "''", description: "Additional Tailwind classes." }
        ]
    },
    
];

