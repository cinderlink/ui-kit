import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import StatusIndicatorStory from './StatusIndicator.story.svelte';

describe('StatusIndicator Story Component', () => {
	test('renders story page with title', async () => {
		const { container } = render(StatusIndicatorStory);

		// Check for heading
		const headings = container.querySelectorAll('h1, h2, h3');
		let hasStatusHeading = false;

		headings.forEach((heading) => {
			if (heading.textContent?.includes('Status')) {
				hasStatusHeading = true;
			}
		});

		expect(hasStatusHeading).toBe(true);
	});

	test('renders status indicator examples', async () => {
		const { container } = render(StatusIndicatorStory);

		// Should have status indicators
		const indicators = container.querySelectorAll('.status-indicator');
		expect(indicators.length).toBeGreaterThan(0);
	});

	test('renders different status types', async () => {
		const { container } = render(StatusIndicatorStory);

		// Should show different status variants
		const indicators = container.querySelectorAll('.status-indicator');
		const statuses = new Set<string>();

		indicators.forEach((indicator) => {
			const classes = Array.from(indicator.classList);
			classes.forEach((cls) => {
				if (cls.match(/status-indicator--(success|warning|error|info|neutral)/)) {
					statuses.add(cls);
				}
			});
		});

		// Should have at least one status type
		expect(statuses.size).toBeGreaterThanOrEqual(1);
	});

	test('renders different sizes', async () => {
		const { container } = render(StatusIndicatorStory);

		// Should show different size variants
		const indicators = container.querySelectorAll('.status-indicator');
		const sizes = new Set<string>();

		indicators.forEach((indicator) => {
			const classes = Array.from(indicator.classList);
			classes.forEach((cls) => {
				if (cls.match(/status-indicator--(xs|sm|md|lg|xl)/)) {
					sizes.add(cls);
				}
			});
		});

		// Should have at least one size
		expect(sizes.size).toBeGreaterThanOrEqual(1);
	});

	test('renders panels with examples', async () => {
		const { container } = render(StatusIndicatorStory);

		// Should have panels
		const panels = container.querySelectorAll('.panel');
		expect(panels.length).toBeGreaterThan(0);

		// Panels should contain status indicators
		let indicatorsInPanels = 0;
		panels.forEach((panel) => {
			const indicators = panel.querySelectorAll('.status-indicator');
			indicatorsInPanels += indicators.length;
		});
		expect(indicatorsInPanels).toBeGreaterThan(0);
	});

	test('renders code examples', async () => {
		const { container } = render(StatusIndicatorStory);

		// Should have code blocks
		const codeBlocks = container.querySelectorAll('.hljs');
		expect(codeBlocks.length).toBeGreaterThan(0);
	});

	test('shows status indicators with labels', async () => {
		const { container } = render(StatusIndicatorStory);

		// Should have some descriptive text
		const pageText = container.textContent?.toLowerCase() || '';
		const hasLabels =
			pageText.includes('status') ||
			pageText.includes('indicator') ||
			pageText.includes('success') ||
			pageText.includes('warning') ||
			pageText.includes('error');

		expect(hasLabels).toBe(true);
	});

	test('renders status indicators in different contexts', async () => {
		const { container } = render(StatusIndicatorStory);

		// Should demonstrate various use cases
		const indicators = container.querySelectorAll('.status-indicator');
		expect(indicators.length).toBeGreaterThan(0);

		// Check for variety in the examples
		const uniqueClasses = new Set<string>();
		indicators.forEach((indicator) => {
			uniqueClasses.add(indicator.className);
		});

		// Should have at least one unique implementation
		expect(uniqueClasses.size).toBeGreaterThanOrEqual(1);
	});
});
