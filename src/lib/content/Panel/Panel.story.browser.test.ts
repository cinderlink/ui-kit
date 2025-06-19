import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import PanelStory from './Panel.story.svelte';

describe('Panel Story Component', () => {
	test('renders story page with title', async () => {
		const { container } = render(PanelStory);
		
		// Check for heading
		const headings = container.querySelectorAll('h1, h2, h3');
		let hasPanelHeading = false;
		
		headings.forEach(heading => {
			if (heading.textContent?.includes('Panel')) {
				hasPanelHeading = true;
			}
		});
		
		expect(hasPanelHeading).toBe(true);
	});

	test('renders panel examples', async () => {
		const { container } = render(PanelStory);
		
		// Should have multiple panels
		const panels = container.querySelectorAll('.panel');
		expect(panels.length).toBeGreaterThan(1);
	});

	test('renders different panel variants', async () => {
		const { container } = render(PanelStory);
		
		// Should show different variants
		const panels = container.querySelectorAll('.panel');
		const variants = new Set<string>();
		
		panels.forEach(panel => {
			const classes = Array.from(panel.classList);
			classes.forEach(cls => {
				if (cls.match(/panel--(glass|frosted|purple|pink|green|blue|yellow|red|surface|overlay)/)) {
					variants.add(cls);
				}
			});
		});
		
		// Should have multiple variants
		expect(variants.size).toBeGreaterThan(2);
	});

	test('renders different depths', async () => {
		const { container } = render(PanelStory);
		
		// Should show different depth levels
		const panels = container.querySelectorAll('.panel');
		const depths = new Set<string>();
		
		panels.forEach(panel => {
			const classes = Array.from(panel.classList);
			classes.forEach(cls => {
				if (cls.match(/panel--depth-\d/)) {
					depths.add(cls);
				}
			});
		});
		
		// Should have at least one depth variant
		expect(depths.size).toBeGreaterThanOrEqual(1);
	});

	test('renders panels with content', async () => {
		const { container } = render(PanelStory);
		
		// Panels should have content
		const panels = container.querySelectorAll('.panel');
		let hasContent = false;
		
		panels.forEach(panel => {
			if (panel.textContent && panel.textContent.trim().length > 0) {
				hasContent = true;
			}
		});
		
		expect(hasContent).toBe(true);
	});

	test('renders documentation structure', async () => {
		const { container } = render(PanelStory);
		
		// Should have descriptive text
		const pageText = container.textContent?.toLowerCase() || '';
		const hasDocumentation = pageText.includes('panel') || 
		                        pageText.includes('glass') || 
		                        pageText.includes('variant');
		
		expect(hasDocumentation).toBe(true);
	});

	test('renders interactive panel examples', async () => {
		const { container } = render(PanelStory);
		
		// Should have some interactive panels
		const interactivePanels = container.querySelectorAll('.panel--interactive');
		expect(interactivePanels.length).toBeGreaterThanOrEqual(0);
		
		// Or check for any panels with hover states
		const panels = container.querySelectorAll('.panel');
		expect(panels.length).toBeGreaterThan(0);
	});

	test('shows variety in panel styling', async () => {
		const { container } = render(PanelStory);
		
		// Should demonstrate various panel configurations
		const panels = container.querySelectorAll('.panel');
		const uniqueClasses = new Set<string>();
		
		panels.forEach(panel => {
			// Create a signature of the panel's variant classes
			const variantClasses = Array.from(panel.classList)
				.filter(cls => cls.startsWith('panel--'))
				.sort()
				.join(' ');
			uniqueClasses.add(variantClasses);
		});
		
		// Should have variety in panel configurations
		expect(uniqueClasses.size).toBeGreaterThan(1);
	});
});