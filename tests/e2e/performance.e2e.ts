import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
	test('homepage loads within performance budget', async ({ page }) => {
		// Start measuring
		await page.goto('/', { waitUntil: 'networkidle' });

		// Get performance metrics
		const performanceTiming = JSON.parse(
			await page.evaluate(() => JSON.stringify(window.performance.timing))
		);

		const loadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
		const domContentLoaded =
			performanceTiming.domContentLoadedEventEnd - performanceTiming.navigationStart;
		const firstPaint = await page.evaluate(() => {
			const paint = performance
				.getEntriesByType('paint')
				.find((entry) => entry.name === 'first-paint');
			return paint ? paint.startTime : 0;
		});

		// Assert performance budgets
		expect(loadTime).toBeLessThan(3000); // Page load under 3s
		expect(domContentLoaded).toBeLessThan(1500); // DOM ready under 1.5s
		expect(firstPaint).toBeLessThan(1000); // First paint under 1s
	});

	test('no memory leaks during navigation', async ({ page }) => {
		// Navigate through multiple pages
		const pages = [
			'/',
			'/components',
			'/components/interactive/button',
			'/guides/quickstart',
			'/themes/overview'
		];

		// Get initial memory usage
		const getMemoryUsage = async () => {
			return await page.evaluate(() => {
				if ('memory' in performance) {
					return (performance as any).memory.usedJSHeapSize;
				}
				return 0;
			});
		};

		const initialMemory = await getMemoryUsage();

		// Navigate through pages multiple times
		for (let i = 0; i < 3; i++) {
			for (const url of pages) {
				await page.goto(url);
				await page.waitForLoadState('networkidle');
			}
		}

		// Force garbage collection if available
		await page.evaluate(() => {
			if (window.gc) {
				window.gc();
			}
		});

		// Check final memory usage
		const finalMemory = await getMemoryUsage();
		const memoryIncrease = finalMemory - initialMemory;

		// Memory increase should be reasonable (less than 50MB)
		expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
	});

	test('bundle size check', async ({ page }) => {
		await page.goto('/');

		// Collect all JavaScript files
		const jsFiles: number[] = [];
		page.on('response', (response) => {
			if (response.url().includes('.js')) {
				const headers = response.headers();
				const size = headers['content-length'];
				if (size) {
					jsFiles.push(parseInt(size));
				}
			}
		});

		await page.waitForLoadState('networkidle');

		// Calculate total JS bundle size
		const totalSize = jsFiles.reduce((sum, size) => sum + size, 0);

		// Assert bundle size budget - adjust for development build which includes source maps and debug info
		// Production builds would be much smaller, but dev builds can be larger
		expect(totalSize).toBeLessThan(2 * 1024 * 1024); // 2MB for dev build
	});
});
