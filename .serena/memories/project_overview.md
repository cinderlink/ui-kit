# Cinderlink UI Kit - Project Overview

## Purpose

The Cinderlink UI Kit (`@cinderlink/ui-kit`) is a modern Svelte 5 component library for the Cinderlink ecosystem. It provides reusable UI components with glass morphism design, built-in dark mode support, and full TypeScript integration.

## Tech Stack

- **Framework**: Svelte 5 with SvelteKit 2
- **Language**: TypeScript (strict mode)
- **Styling**: UnoCSS (utility-first CSS)
- **Package Manager**: pnpm (CRITICAL: Never use npm)
- **Build Tool**: Vite
- **Testing**:
  - Unit Tests: Vitest with @testing-library/svelte
  - E2E Tests: Playwright
- **Code Quality**: ESLint, Prettier, svelte-check, husky (pre-commit hooks)

## Architecture

- Components organized by category in `src/lib/`:
  - `/content` - UI content components
  - `/interactive` - Interactive components
  - `/indicator` - Status and loading indicators
  - `/layout` - Layout components
  - `/navigation` - Navigation components
  - `/markup` - Code and markdown display
  - `/data` - Data display components
  - `/theme` - Theme management

## Key Features

- Svelte 5 runes API (`$props()`, `$state()`, `$effect()`)
- Glass morphism design system
- Dark mode support
- Tree-shakeable modules
- WCAG AA accessibility
- Framework package integration (`@cinderlink/core-types`, `@cinderlink/protocol`)

## Development Port

- Dev server runs on port 3002
