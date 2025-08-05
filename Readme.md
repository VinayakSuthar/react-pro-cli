# React Pro CLI

A modern, lightweight CLI tool to scaffold React projects with best practices, pre-configured templates, and modern tooling. Published on NPM and GitHub Packages for seamless integration and rapid project setup.

---

## Features

- **Quick Project Setup:** Instantly scaffold a new React project with a single command.
- **Customizable Templates:** Ships with a `template-main` starter, easily extendable for future templates.
- **Modern Tooling:** Uses Vite, TypeScript, Tailwind CSS, MUI, Ant Design, ESLint, Prettier, and more.
- **Interactive CLI:** Uses `prompts` for a user-friendly, interactive experience.
- **Cross-Platform:** Works on macOS, Linux, and Windows.
- **Pre-configured Linting & Formatting:** ESLint, Prettier, Stylelint, and Husky for code quality and consistency.
- **GitHub Actions Integration:** Automated publishing to NPM and GitHub Packages.

---

## Prerequisites

- **Node.js:** v18 or higher (recommended v20+)
- **npm:** v8 or higher

---

## Installation

You can use the CLI directly with `npx` (no global install required):

```sh
npx @vin-1337/rpc
```

Or install globally:

```sh
npm install -g @vin-1337/rpc
```

---

## Usage

Run the CLI to scaffold a new React project:

```sh
rpc
```

You will be prompted for:

- Project name
- Overwrite options (if directory exists)
- Package name (auto-suggested)
- TypeScript support (yes/no)
- UI library (None/MUI/Ant Design/Shadcn/ui)
- Tailwind CSS (yes/no)

Example:

```sh
rpc my-app
```

- **Prompt:** Project name? `my-app`
- **Creates:** `./my-app/` with React files and configuration
- **Next steps:**
  ```sh
  cd my-app
  npm install
  npm run dev
  ```

---

## What’s Included in the Generated Project?

- **Vite** for fast builds and hot reload
- **TypeScript** (optional)
- **Tailwind CSS** (optional)
- **Material UI** or **Ant Design** (optional)
- **ESLint, Prettier, Stylelint** for code quality
- **Husky & lint-staged** for pre-commit checks
- **Ready-to-go App and test files**

---

## Project Structure

```
react-pro-cli/
├── build.config.ts                # Unbuild configuration for CLI build
├── eslint.config.mjs              # Root ESLint config
├── index.js                       # CLI entry point (bin)
├── package.json                   # Project manifest
├── tsconfig.json                  # TypeScript config
├── src/
│   ├── index.ts                   # Main CLI logic
│   ├── config/                    # All configuration files (JSON/TS)
│   ├── constants/                 # Template and config string constants
│   ├── formatters/                # Helpers for formatting configs
│   ├── helpers/                   # Utility functions for file ops, CLI, etc.
│   ├── template-main/             # The main React project template
│   └── types/                     # TypeScript type definitions
├── build/                         # Build output (gitignored)
└── test app/                      # (Optional) Test app folder
```

---

## Configuration Files

- **config/**: All configuration for dependencies, scripts, aliases, and tool-specific settings (Vite, Tailwind, MUI, TypeScript, etc.)
- **constants/**: String templates for main files (e.g., `App.tsx`, `main.tsx`, Vite config, ESLint config)
- **helpers/**: Utility functions for file operations, placeholder replacement, and CLI logic

---

## Contribution

We welcome contributions! Here’s how:

1. Fork the repo
2. Create a branch:
   ```sh
   git checkout -b feature/your-feature
   ```
3. Commit changes:
   ```sh
   git commit -m "Add your feature"
   ```
4. Push to your fork:
   ```sh
   git push origin feature/your-feature
   ```
5. Open a Pull Request

Please ensure all linting and tests pass before submitting.

---

## License

ISC License. See [LICENSE](LICENSE) for details.

---

## Links

- [GitHub Repository](https://github.com/VinayakSuthar/react-pro-cli)
- [NPM Package](https://www.npmjs.com/package/@vin-1337/rpc)

---

## Roadmap & Upcoming Features

- Multiple templates (Next.js, Redux, etc.)
- Plugin system for custom features
- Monorepo support
- Customizable prompts
- Template marketplace
- Automatic dependency updates

---

## Learning Opportunities

- Modern React stack (React, Vite, TypeScript, Tailwind CSS, MUI)
- Project scaffolding and automation
- Tooling: ESLint, Prettier, Stylelint, Husky, lint-staged
- Configuration management
- Template customization
- CI/CD with GitHub Actions
- Extending CLI tools
