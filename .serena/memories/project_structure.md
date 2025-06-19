# Cinderlink UI Kit - Project Structure

## Root Structure

```
/
├── src/
│   ├── lib/            # Component library source
│   ├── routes/         # Documentation site routes
│   ├── app.css         # Global styles
│   ├── app.html        # HTML template
│   └── setupTests.ts   # Vitest setup
├── tests/              # Playwright E2E tests
├── dist/               # Built library output
├── static/             # Static assets
├── .svelte-kit/        # SvelteKit generated files
└── coverage/           # Test coverage reports
```

## Component Library Structure (`src/lib/`)

```
lib/
├── content/            # UI content components
│   ├── Avatar/
│   ├── Card/
│   ├── Typography/
│   ├── Notification/
│   ├── Panel/
│   ├── Reaction/
│   └── Emoji/
├── interactive/        # Interactive components
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   ├── Dropdown/
│   ├── Toggle/
│   ├── Select/
│   ├── List/
│   └── ImageUpload/
├── layout/             # Layout components
│   ├── Sidebar/
│   ├── SidebarLayout/
│   ├── Page/
│   ├── PageContainer/
│   └── SidebarToggle/
├── indicator/          # Status indicators
│   ├── LoadingIndicator/
│   ├── StatusIndicator/
│   └── ProgressBar/
├── navigation/         # Navigation components
│   └── Breadcrumb/
├── markup/             # Code/text display
│   ├── Code/
│   ├── CodeEditor/
│   ├── Markdown/
│   └── Syntax/
├── data/               # Data display
│   └── Datatable/
├── theme/              # Theme system
│   ├── Theme.svelte
│   ├── ThemeToggle.svelte
│   ├── store.svelte.ts
│   └── contrast.ts
└── index.ts            # Main exports
```

## Documentation Site (`src/routes/`)

```
routes/
├── +layout.svelte      # App layout
├── +page.svelte        # Homepage
├── components/         # Component browser
│   ├── [groupId]/      # Component group pages
│   └── [groupId]/[storyId]/ # Individual stories
├── guides/             # Documentation guides
│   ├── installation/
│   ├── quickstart/
│   └── examples/
└── themes/             # Theme documentation
    ├── overview/
    └── contrast/
```

## Test Structure

```
tests/
├── components/         # Component-specific tests
├── pages/              # Page object models
├── helpers/            # Test utilities
├── screenshots.spec.ts # Visual regression tests
└── accessibility.spec.ts # A11y tests
```

## Configuration Files

- `svelte.config.js` - SvelteKit configuration
- `vite.config.ts` - Vite build configuration
- `vitest.config.ts` - Vitest test configuration
- `playwright.config.ts` - Playwright E2E configuration
- `uno.config.ts` - UnoCSS styling configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.cjs` - ESLint rules
- `.prettierrc` - Prettier formatting
- `pnpm-workspace.yaml` - pnpm workspace config
