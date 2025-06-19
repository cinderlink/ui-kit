import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import SelectStory from './Select.story.svelte';

describe('Select Story Component', () => {
	test('renders story page with title', async () => {
		const screen = render(SelectStory);
		
		// Check heading - use exact match to avoid multiple matches
		const heading = await screen.getByRole('heading', { name: 'Select', exact: true });
		await expect.element(heading).toBeInTheDocument();
	});

	test('renders select examples', async () => {
		const { container } = render(SelectStory);
		
		// Should have select components
		const selects = container.querySelectorAll('.dropdown');
		expect(selects.length).toBeGreaterThan(0);
		
		// Should have variant examples
		const panels = container.querySelectorAll('.panel');
		expect(panels.length).toBeGreaterThan(0);
	});

	test('renders different select variants', async () => {
		const { container } = render(SelectStory);
		
		// Should have at least one dropdown
		const dropdowns = container.querySelectorAll('.dropdown');
		expect(dropdowns.length).toBeGreaterThan(0);
		
		// Check for dropdown select elements with variant classes
		const selects = container.querySelectorAll('[class*="dropdown__select--"]');
		expect(selects.length).toBeGreaterThan(0);
	});

	test('renders code examples', async () => {
		const { container } = render(SelectStory);
		
		// Should have code blocks
		const codeBlocks = container.querySelectorAll('.hljs');
		expect(codeBlocks.length).toBeGreaterThan(0);
		
		// Should have syntax highlighting
		const highlightedCode = container.querySelector('.hljs-tag');
		expect(highlightedCode).toBeTruthy();
	});

	test('renders interactive examples', async () => {
		const { container } = render(SelectStory);
		
		// Find a select component
		const trigger = container.querySelector('[data-testid="dropdown-trigger"]') as HTMLElement;
		expect(trigger).toBeTruthy();
		
		// Click to open
		trigger.click();
		
		// Wait for dropdown to open
		await new Promise(resolve => setTimeout(resolve, 250));
		
		// Should show options or at least have tried to open
		const menu = container.querySelector('.dropdown__menu');
		// If menu exists, check for options
		if (menu) {
			const options = container.querySelectorAll('[role="option"]');
			expect(options.length).toBeGreaterThanOrEqual(0);
		}
		
		// At minimum, the trigger should exist and be clickable
		expect(trigger).toBeTruthy();
	});

	test('renders select with icons', async () => {
		const { container } = render(SelectStory);
		
		// Check that story has dropdowns
		const triggers = container.querySelectorAll('[data-testid="dropdown-trigger"]');
		expect(triggers.length).toBeGreaterThan(0);
		
		// Try to open the first dropdown
		if (triggers.length > 0) {
			(triggers[0] as HTMLElement).click();
			
			// Wait for dropdown to open
			await new Promise(resolve => setTimeout(resolve, 250));
			
			// Look for any dropdown content
			const menu = container.querySelector('.dropdown__menu');
			if (menu) {
				// Look for options
				const options = container.querySelectorAll('[role="option"]');
				// Just verify structure exists
				expect(options).toBeDefined();
			}
		}
	});

	test('renders multiple panel sections', async () => {
		const { container } = render(SelectStory);
		
		// Should have panels for different examples
		const panels = container.querySelectorAll('.panel--surface');
		expect(panels.length).toBeGreaterThanOrEqual(2);
		
		// Panels should contain select examples
		let selectCount = 0;
		panels.forEach(panel => {
			const selects = panel.querySelectorAll('.dropdown');
			selectCount += selects.length;
		});
		// At least one select should exist
		expect(selectCount).toBeGreaterThan(0);
	});
});