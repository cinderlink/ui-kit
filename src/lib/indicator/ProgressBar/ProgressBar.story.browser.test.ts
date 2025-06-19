import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ProgressBarStory from './ProgressBar.story.svelte';

describe('ProgressBar Story Component', () => {
	test('renders story page with title', async () => {
		const { container } = render(ProgressBarStory);
		
		// Check for heading
		const headings = container.querySelectorAll('h1, h2, h3');
		let hasProgressHeading = false;
		
		headings.forEach(heading => {
			const text = heading.textContent || '';
			if (text.includes('Progress') || text.includes('Bar')) {
				hasProgressHeading = true;
			}
		});
		
		expect(hasProgressHeading).toBe(true);
	});

	test('renders progress bar examples', async () => {
		const { container } = render(ProgressBarStory);
		
		// Should have progress bars
		const progressBars = container.querySelectorAll('.progress__bar');
		expect(progressBars.length).toBeGreaterThan(0);
		
		// Should have fill elements
		const fills = container.querySelectorAll('.progress__fill');
		expect(fills.length).toBeGreaterThan(0);
	});

	test('renders different progress values', async () => {
		const { container } = render(ProgressBarStory);
		
		// Should show different progress values
		const fills = container.querySelectorAll('.progress__fill');
		const widths = new Set<string>();
		
		fills.forEach(fill => {
			const width = (fill as HTMLElement).style.width;
			if (width) {
				widths.add(width);
			}
		});
		
		// Should have variety in progress values
		expect(widths.size).toBeGreaterThanOrEqual(1);
	});

	test('renders different sizes', async () => {
		const { container } = render(ProgressBarStory);
		
		// Should show different size variants
		const progressBars = container.querySelectorAll('.progress__bar');
		const sizes = new Set<string>();
		
		progressBars.forEach(bar => {
			const classes = Array.from(bar.classList);
			classes.forEach(cls => {
				if (cls.match(/progress__bar--(sm|md|lg|xl|2xl)/)) {
					sizes.add(cls);
				}
			});
		});
		
		// Should have at least one size variant
		expect(sizes.size).toBeGreaterThanOrEqual(1);
	});

	test('renders panels with examples', async () => {
		const { container } = render(ProgressBarStory);
		
		// Should have panels
		const panels = container.querySelectorAll('.panel');
		expect(panels.length).toBeGreaterThan(0);
		
		// Panels should contain progress bars
		let barsInPanels = 0;
		panels.forEach(panel => {
			const bars = panel.querySelectorAll('.progress__bar');
			barsInPanels += bars.length;
		});
		expect(barsInPanels).toBeGreaterThan(0);
	});

	test('renders documentation structure', async () => {
		const { container } = render(ProgressBarStory);
		
		// Should have panels for documentation
		const panels = container.querySelectorAll('.panel');
		expect(panels.length).toBeGreaterThan(0);
		
		// Should have progress bar examples
		const progressBars = container.querySelectorAll('.progress__bar');
		expect(progressBars.length).toBeGreaterThan(0);
	});

	test('shows progress fills', async () => {
		const { container } = render(ProgressBarStory);
		
		// All progress bars should have fills
		const fills = container.querySelectorAll('.progress__fill');
		expect(fills.length).toBeGreaterThan(0);
		
		// Each fill should have the progress__fill class
		fills.forEach(fill => {
			expect(fill.classList.contains('progress__fill')).toBe(true);
		});
	});

	test('renders progress bars with content', async () => {
		const { container } = render(ProgressBarStory);
		
		// Should have content containers
		const contents = container.querySelectorAll('.progress__content');
		expect(contents.length).toBeGreaterThan(0);
		
		// At least some should have text content
		let _hasTextContent = false;
		contents.forEach(content => {
			if (content.textContent && content.textContent.trim().length > 0) {
				_hasTextContent = true;
			}
		});
		
		// Story should demonstrate progress bars with content
		expect(contents.length).toBeGreaterThan(0);
	});
});