# CRUSH.md

## Build, Lint, and Test Commands

- **Install dependencies:** `bun install`
- **Start dev server:** `bun dev`
- **Build project:** `bun build`
- **Preview build:** `bun preview`
- **Astro CLI:** `bun astro <args>`
- **Typecheck:** `bun astro check` (no lint script found)
- **Test:** No test scripts configured in package.json

## Code Style Guidelines

- **Imports:** Use ESM imports. Aliases set in tsconfig (`@/`, `@components/`, etc). Import third-party before local modules.
- **File Extensions:** Use `.astro`, `.ts`, and `.mdx` for components, utilities, and content.
- **Formatting:** 2 spaces indent, trailing commas per Astro/TS community conventions.
- **Naming:**
  - Files/folders: kebab-case or PascalCase for Astro components.
  - Variables/functions: camelCase.
  - Type/interface names: PascalCase.
- **Types:** Use TypeScript types everywhere. Prefer strict types (`strictNullChecks` true).
- **Components:** Prefer props over global state. One top-level export per file.
- **Error Handling:** Prefer explicit error checks; do not suppress errors or use `any`.
- **Strings:** Prefer double quotes.
- **Content:** Markdown/MDX for blog, content lives in `src/content`.
- **Theme/UI:** Use UnoCSS utility classes in markup for styling.
- **No comments** unless required for context.
- **Astro pages:** Top-matter script (---) followed by markup.

## Misc
- Ignore `.crush/` directory and its contents in git.
