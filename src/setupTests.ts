// Vitest global setup

import { afterEach, expect } from 'vitest';
// Vitest provides expect; expose it early for jest-dom to extend
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const matchers = require('@testing-library/jest-dom/matchers');
// debug
console.log('[setup] expect.extend type:', typeof expect.extend);
console.log('[setup] matchers keys:', Object.keys(matchers).slice(0,5), '...');
expect.extend(matchers);
import { cleanup } from '@testing-library/svelte';

afterEach(() => {
  cleanup();
});

// Any additional global test setup can be added here.
