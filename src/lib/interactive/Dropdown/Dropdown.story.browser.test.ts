import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import DropdownStory from './Dropdown.story.svelte';

describe('Dropdown Story Component', () => {
	test('renders story page structure', async () => {
		const { container } = render(DropdownStory);

		// Should have story container
		const story = container.querySelector('.story');
		expect(story).toBeTruthy();

		// Should have panels
		const panels = container.querySelectorAll('.panel--surface');
		expect(panels.length).toBeGreaterThan(0);
	});

	test('renders customize section', async () => {
		const screen = render(DropdownStory);

		// Check for customize heading
		const customizeHeading = await screen.getByText('Customize');
		await expect.element(customizeHeading).toBeInTheDocument();

		// Should have toggle for square/rounded
		const toggle = await screen.getByText('Square');
		await expect.element(toggle).toBeInTheDocument();
	});

	test('renders dropdown examples', async () => {
		const { container } = render(DropdownStory);

		// Should have dropdowns
		const dropdowns = container.querySelectorAll('.dropdown');
		expect(dropdowns.length).toBeGreaterThan(0);

		// Check for dropdown triggers
		const triggers = container.querySelectorAll('[data-testid="dropdown-trigger"]');
		expect(triggers.length).toBeGreaterThan(0);
	});

	test('renders options list dropdown', async () => {
		const { container } = render(DropdownStory);

		// Find dropdown with "Options list" label
		const selectedDivs = container.querySelectorAll('.dropdown__selected');
		let foundOptionsList = false;

		selectedDivs.forEach((div) => {
			if (div.textContent === 'Select') {
				foundOptionsList = true;
			}
		});

		expect(foundOptionsList).toBe(true);
	});

	test('renders usage section', async () => {
		const screen = render(DropdownStory);

		// Check for usage heading
		const usageHeading = await screen.getByText('Usage');
		await expect.element(usageHeading).toBeInTheDocument();

		// Should have code examples
		const { container } = render(DropdownStory);
		const codeBlocks = container.querySelectorAll('.hljs');
		expect(codeBlocks.length).toBeGreaterThan(0);
	});
});
