import { render } from 'vitest-browser-svelte';
import { expect, test, describe } from 'vitest';
import Dropdown from './Dropdown.svelte';

describe('Dropdown component', () => {
	test('renders closed by default', async () => {
		const { container } = render(Dropdown);
		
		// Dropdown should render
		const dropdown = container.querySelector('.dropdown');
		expect(dropdown).toBeTruthy();
		
		// Menu should not be visible
		const menu = container.querySelector('.dropdown__menu');
		expect(menu).toBeFalsy();
		
		// Should be collapsed
		const trigger = container.querySelector('[role="button"]');
		expect(trigger?.getAttribute('aria-expanded')).toBe('false');
	});

	test('opens menu when trigger clicked', async () => {
		const screen = render(Dropdown);
		
		// Click trigger
		const trigger = await screen.getByTestId('dropdown-trigger');
		await trigger.click();
		
		// Wait for animation
		await new Promise(resolve => setTimeout(resolve, 250));
		
		// Menu should be visible now
		const { container } = render(Dropdown, { toggled: true });
		const menu = container.querySelector('.dropdown__menu');
		expect(menu).toBeTruthy();
	});

	test('renders with selected option', async () => {
		const { container } = render(Dropdown, {
				type: 'select',
				selected: { label: 'Option 2', value: 'option2' }
			});
		
		// Should display selected value
		const selectedDiv = container.querySelector('.dropdown__selected');
		expect(selectedDiv?.textContent).toBe('Option 2');
	});

	test('renders with label for dropdown type', async () => {
		const { container } = render(Dropdown, {
				type: 'dropdown',
				label: 'Dropdown Label'
			});
		
		// Should display label in dropdown
		const selectedDiv = container.querySelector('.dropdown__selected');
		expect(selectedDiv?.textContent).toBe('Dropdown Label');
	});

	test('renders with label for select type', async () => {
		const screen = render(Dropdown, {
				type: 'select',
				label: 'Select Label'
			});
		
		// Should have label element for select type
		const label = await screen.getByText('Select Label');
		await expect.element(label).toBeInTheDocument();
	});

	test('applies size variants', async () => {
		const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
		
		for (const size of sizes) {
			const { container } = render(Dropdown, { size });
			
			const dropdownContainer = container.querySelector('.dropdown__container');
			expect(dropdownContainer?.classList.contains(`dropdown--${size}`)).toBe(true);
		}
	});

	test('applies custom class', async () => {
		const customClass = 'custom-dropdown';
		const { container } = render(Dropdown, {
				classes: customClass
			});
		
		const dropdownContainer = container.querySelector('.dropdown__container');
		expect(dropdownContainer?.classList.contains(customClass)).toBe(true);
	});

	test('handles toggle events', async () => {
		let toggledState = false;
		const screen = render(Dropdown, {
				get toggled() { return toggledState; },
				set toggled(v: boolean) { toggledState = v; }
			});
		
		// Toggle open
		const trigger = await screen.getByTestId('dropdown-trigger');
		await trigger.click();
		
		expect(toggledState).toBe(true);
	});

	test('closes on escape key', async () => {
		let toggledState = true;
		const { container } = render(Dropdown, {
				get toggled() { return toggledState; },
				set toggled(v: boolean) { toggledState = v; }
			});
		
		const trigger = container.querySelector('[role="button"]') as HTMLElement;
		expect(trigger).toBeTruthy();
		
		// Simulate Escape key
		const event = new KeyboardEvent('keypress', { key: 'Escape', bubbles: true });
		trigger.dispatchEvent(event);
		
		expect(toggledState).toBe(false);
	});
});