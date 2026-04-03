# rankflow-ui

A sleek CLI tool to add beautiful, animated components from the Rankflow collection directly to your React project.

**🌐 [Explore the Component Gallery](https://ui.rankflow.in)**
Explore and preview all components in our interactive gallery before adding them to your project.

## Installation

You can use it via `npx` without installation:

```bash
npx rankflow-ui add <component-name>
```

Or install it globally:

```bash
npm install -g rankflow-ui
```

## Preview Components

Before adding components, you can preview them live in the Rankflow UI Gallery:
👉 **[ui.rankflow.in](https://ui.rankflow.in)**

Explore the design, interact with variants, and copy the `npx` command directly from the component page.

## Commands

### `list`
Lists all available components in the registry.

```bash
rankflow-ui list
```

### `add <component>`
Adds a specific component to your project. Supports Next.js (components/ui) and Vite (src/components/ui) structures automatically.

```bash
rankflow-ui add glow-button
```

## Features

- **Interactive Gallery**: Preview components live at **[ui.rankflow.in](https://ui.rankflow.in)**.
- **Framework Detection**: Automatically detects Next.js or Vite.
- **Dependency Tracking**: Warns you about required dependencies like `framer-motion` or `lucide-react`.
- **Beautiful UI**: Built with `@clack/prompts` for a premium terminal experience.

## License

MIT
