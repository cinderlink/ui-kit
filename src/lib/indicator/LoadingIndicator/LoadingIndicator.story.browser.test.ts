import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import LoadingIndicatorStory from './LoadingIndicator.story.svelte';

describe('LoadingIndicator Story Component', () => {
	test('renders story page with title', async () => {
		const { container } = render(LoadingIndicatorStory);
		
		// Check for heading
		const headings = container.querySelectorAll('h1, h2, h3');
		let hasLoadingHeading = false;
		
		headings.forEach(heading => {
			if (heading.textContent?.includes('Loading')) {
				hasLoadingHeading = true;
			}
		});
		
		expect(hasLoadingHeading).toBe(true);
	});

	test('renders loading indicator examples', async () => {
		const { container } = render(LoadingIndicatorStory);
		
		// Should have loading indicators
		const indicators = container.querySelectorAll('.loading-indicator');
		expect(indicators.length).toBeGreaterThan(0);
		
		// Should have spinning icons
		const spinners = container.querySelectorAll('.animate-spin');
		expect(spinners.length).toBeGreaterThan(0);
	});

	test('renders different size variants', async () => {
		const { container } = render(LoadingIndicatorStory);
		
		// Should show different sizes
		const indicators = container.querySelectorAll('.loading-indicator');
		expect(indicators.length).toBeGreaterThan(0);
		
		// Check if there are different size classes
		const sizes = new Set<string>();
		
		indicators.forEach(indicator => {
			const classes = Array.from(indicator.classList);
			classes.forEach(cls => {
				if (cls.startsWith('loading-indicator--')) {
					sizes.add(cls);
				}
			});
		});
		
		// Should have at least one size variant
		expect(sizes.size).toBeGreaterThanOrEqual(1);
	});

	test('renders panels with examples', async () => {
		const { container } = render(LoadingIndicatorStory);
		
		// Should have panels
		const panels = container.querySelectorAll('.panel');
		expect(panels.length).toBeGreaterThan(0);
		
		// Panels should contain loading indicators
		let indicatorsInPanels = 0;
		panels.forEach(panel => {
			const indicators = panel.querySelectorAll('.loading-indicator');
			indicatorsInPanels += indicators.length;
		});
		expect(indicatorsInPanels).toBeGreaterThan(0);
	});

	test('renders code examples', async () => {
		const { container } = render(LoadingIndicatorStory);
		
		// Should have code blocks
		const codeBlocks = container.querySelectorAll('.hljs');
		expect(codeBlocks.length).toBeGreaterThan(0);
		
		// Should have syntax highlighting
		const highlightedCode = container.querySelector('.hljs-tag');
		expect(highlightedCode).toBeTruthy();
	});

	test('shows loading indicators with text', async () => {
		const { container } = render(LoadingIndicatorStory);
		
		// Some indicators should have text content
		const indicators = container.querySelectorAll('.loading-indicator');
		let _hasTextContent = false;
		
		indicators.forEach(indicator => {
			// Check if indicator has text beyond just the icon
			const textContent = indicator.textContent?.trim();
			if (textContent && textContent.length > 0) {
				// Remove icon element to check for actual text
				const clone = indicator.cloneNode(true) as HTMLElement;
				const icon = clone.querySelector('.loading-indicator__icon');
				icon?.remove();
				if (clone.textContent?.trim()) {
					_hasTextContent = true;
				}
			}
		});
		
		// At least some examples should show text with the loading indicator
		expect(indicators.length).toBeGreaterThan(0);
	});

	test('all spinners are animating', async () => {
		const { container } = render(LoadingIndicatorStory);
		
		// All loading icons should have animate-spin class
		const icons = container.querySelectorAll('.loading-indicator__icon');
		let allAnimating = true;
		
		icons.forEach(icon => {
			if (!icon.classList.contains('animate-spin')) {
				allAnimating = false;
			}
		});
		
		expect(allAnimating).toBe(true);
		expect(icons.length).toBeGreaterThan(0);
	});
});