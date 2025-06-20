# Task Completion Checklist

When you complete any coding task in this project, follow these steps:

## 1. Code Quality Checks

### Type Checking

```bash
pnpm check
```

- Must pass with 0 errors
- If errors occur, fix them before proceeding

### Linting

```bash
pnpm lint
```

- Must pass with 0 errors/warnings
- Fix all linting issues properly
- NEVER use --no-verify to bypass

### Formatting

```bash
pnpm format:check
```

- If formatting needed:

```bash
pnpm format
```

## 2. Testing

### For Component Changes

- Run existing unit tests:

```bash
pnpm test:unit
```

### For UI/Visual Changes

- Run E2E tests:

```bash
pnpm test
```

### For New Components

- Create `.test.ts` file with unit tests
- Create `.story.svelte` file for documentation
- Export from category's index.ts

## 3. Build Verification

```bash
pnpm build
```

- Ensure build completes successfully
- Check dist/ folder generated properly

## 4. Git Commit Rules

- Stage changes carefully
- Write clear commit messages
- Let pre-commit hooks run (husky)
- Fix any hook failures

## 5. Documentation Updates

- Update CLAUDE.md if architecture changes
- Update component stories if API changes
- Keep TypeScript interfaces documented

## Special Considerations

- If dev server is running, changes hot-reload automatically
- For breaking changes, update dependent components
- For new dependencies, ensure pnpm workspace links work
- Run visual regression tests for UI changes

## Command Summary for Task Completion

```bash
# The essential commands to run
pnpm check && pnpm lint && pnpm format:check && pnpm test:unit && pnpm build
```

If all pass, the task is complete!
