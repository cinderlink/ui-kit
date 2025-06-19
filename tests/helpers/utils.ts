import { expect, type Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import AxeBuilder from '@axe-core/playwright';

/**
 * Recursively collect all files under a directory (sync).
 */
function walkDir(dir: string, ext: string, fileList: string[] = []) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkDir(full, ext, fileList);
		else if (entry.isFile() && entry.name.endsWith(ext)) fileList.push(full);
	}
	return fileList;
}

export interface RouteDef {
	path: string;
	name: string;
}

/**
 * Derive all component routes based on *.story.svelte files.
 * Any missing stories will simply be skipped.
 */
export function getComponentRoutes(): RouteDef[] {
	const srcRoot = path.join(process.cwd(), 'src', 'lib');
	const files = walkDir(srcRoot, '.story.svelte');
	return files.map((file) => {
		// e.g. src/lib/interactive/Button/Button.story.svelte
		const rel = path.relative(srcRoot, file).replace(/\\/g, '/');
		// group & id from path segments
		const segments = rel.split('/');
		const group = segments[0]; // interactive
		const id = segments[segments.length - 1].replace(/\.story\.svelte$/, '').toLowerCase();
		const route = `/components/${group}/${id}`;
		return { path: route, name: `${group}-${id}` } as RouteDef;
	});
}

export function getStaticRoutes(): RouteDef[] {
	return [
		{ path: '/', name: 'home' },
		{ path: '/themes/overview', name: 'themes-overview' },
		{ path: '/guides/installation', name: 'guides-installation' }
	];
}

export function getAllRoutes(): RouteDef[] {
	return [...getStaticRoutes(), ...getComponentRoutes()];
}

export async function gotoAndWait(page: Page, target: string) {
	await page.goto(target);
	await page.waitForLoadState('networkidle');
	// wait for first heading to be visible as an indicator of hydration complete
	const heading = page.locator('h1, h2, h3').first();
	await heading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
}

export async function ensureToggle(page: Page) {
	const locator = page.locator('[data-testid="theme-toggle"]').first();
	const count = await locator.count();
	if (count === 0) {
		// Return a no-op locator to avoid test failures on pages without toggle
		return page.locator('body');
	}
	await locator.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {
		/* ignore */
	});
	return locator;
}

export async function snap(page: Page, fileName: string) {
	const img = await page.screenshot({ fullPage: true });
	expect(img).toMatchSnapshot(fileName, { maxDiffPixelRatio: 0.05 });
}

export async function checkA11y(page: Page) {
	const results = await new AxeBuilder({ page: page as any })
		.withTags(['wcag2a', 'wcag2aa']) // Strictness level desired
		.analyze();
	expect(results.violations, `WCAG violations: ${results.url}`).toEqual([]);
}

/**
 * Toggle theme to the requested mode and wait until the <html> element reflects it.
 * This avoids brittle fixed timeouts.
 */
export async function switchTheme(page: Page, mode: 'light' | 'dark') {
	const html = page.locator('html');

	// Determine current mode
	const currentlyDark = await html.evaluate((el) => el.classList.contains('dark'));

	if ((mode === 'dark' && !currentlyDark) || (mode === 'light' && currentlyDark)) {
		await page.locator('[data-testid="theme-toggle"]').click();
	}

	// Wait until the class list matches the desired mode
	if (mode === 'dark') {
		await expect(html).toHaveClass(/dark/, { timeout: 5000 });
	} else {
		await expect(html).not.toHaveClass(/dark/, { timeout: 5000 });
	}
}
