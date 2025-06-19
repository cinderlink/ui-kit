# Suggested Commands for Cinderlink UI Kit

## Package Manager
**CRITICAL**: Always use `pnpm` instead of `npm`

## Development Commands
```bash
# Start dev server (port 3002)
pnpm dev

# Watch mode for package building
pnpm watch

# Build the library
pnpm build
```

## Testing Commands
```bash
# Run Playwright E2E tests
pnpm test

# Run Vitest unit tests
pnpm test:unit

# Run unit tests in watch mode
pnpm test:unit:watch

# Run tests with coverage
pnpm test:coverage
```

## Code Quality Commands
```bash
# Type checking with svelte-check
pnpm check

# Type checking in watch mode
pnpm check:watch

# Lint code (ESLint)
pnpm lint

# Format code (Prettier)
pnpm format

# Check formatting without changes
pnpm format:check
```

## Dev Server Management
```bash
# Check if server is running
lsof -ti:3002

# Kill existing dev server
lsof -ti:3002 | xargs kill -9 2>/dev/null || true

# Start with logging
pnpm dev > dev-server.log 2>&1 &
echo $! > dev-server.pid

# Check server status
curl -s http://localhost:3002 > /dev/null && echo "Server is running" || echo "Server is not running"
```

## System Commands (Darwin/macOS)
```bash
# Git
git status
git diff
git log
git add
git commit -m "message"

# File system
ls -la
find . -name "*.svelte"
grep -r "pattern" .

# Process management
ps aux | grep node
kill -9 PID
lsof -i :PORT

# Screen/tmux for long-running processes
screen -S ui-kit-dev
screen -r ui-kit-dev
tmux new -s ui-kit-dev
tmux attach -t ui-kit-dev
```

## Bun Support
The project also has bun.lock, indicating Bun compatibility:
```bash
bun install
bun run dev
bun test
```