import { render } from 'vitest-browser-svelte';
import { expect, test, describe } from 'vitest';
import Select from './Select.svelte';

describe('Select component', () => {
	const mockOptions = [
		{ label: 'Option 1', value: 'opt1' },
		{ label: 'Option 2', value: 'opt2' },
		{ label: 'Option 3', value: 'opt3', icon: 'i-tabler-star' }
	];

	test('renders with default props', async () => {
		const { container } = render(Select, {
				options: []
			});
		
		// Should render dropdown container
		const dropdown = container.querySelector('.dropdown');
		expect(dropdown).toBeTruthy();
		
		// Should show default "Select" text
		const selected = container.querySelector('.dropdown__selected');
		expect(selected?.textContent).toBe('Select');
	});

	test('renders with custom options', async () => {
		const { container } = render(Select, {
				options: mockOptions
			});
		
		// Should render dropdown
		const dropdown = container.querySelector('.dropdown');
		expect(dropdown).toBeTruthy();
		
		// Click to open dropdown
		const trigger = container.querySelector('[data-testid="dropdown-trigger"]') as HTMLElement;
		expect(trigger).toBeTruthy();
		trigger.click();
		
		// Wait a bit for the dropdown to open
		await new Promise(resolve => setTimeout(resolve, 250));
		
		// Should render all options
		const optionItems = container.querySelectorAll('[role="option"]');
		expect(optionItems.length).toBe(3);
		
		// Check option content
		expect(optionItems[0].textContent).toContain('Option 1');
		expect(optionItems[1].textContent).toContain('Option 2');
		expect(optionItems[2].textContent).toContain('Option 3');
		
		// Third option should have icon
		const icon = optionItems[2].querySelector('.i-tabler-star');
		expect(icon).toBeTruthy();
	});

	test('handles value binding', async () => {
		let value = 'opt2';
		const { container } = render(Select, {
				options: mockOptions,
				get value() { return value; },
				set value(v: string) { value = v; }
			});
		
		// Should show selected option label
		const selected = container.querySelector('.dropdown__selected');
		expect(selected?.textContent).toBe('Option 2');
		
		// Open dropdown
		const trigger = container.querySelector('[data-testid="dropdown-trigger"]') as HTMLElement;
		trigger.click();
		
		// Wait for dropdown to open
		await new Promise(resolve => setTimeout(resolve, 250));
		
		// Click first option
		const options = container.querySelectorAll('[role="option"]');
		(options[0] as HTMLElement).click();
		
		// Wait for state update
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Value should be updated
		expect(value).toBe('opt1');
		
		// Selected text should update
		const updatedSelected = container.querySelector('.dropdown__selected');
		expect(updatedSelected?.textContent).toBe('Option 1');
	});

	test('handles selected object binding', async () => {
		let selected = mockOptions[1];
		const { container } = render(Select, {
				options: mockOptions,
				get selected() { return selected; },
				set selected(s: typeof selected) { selected = s; }
			});
		
		// Should show selected option label
		const selectedText = container.querySelector('.dropdown__selected');
		expect(selectedText?.textContent).toBe('Option 2');
		
		// Open dropdown
		const trigger = container.querySelector('[data-testid="dropdown-trigger"]') as HTMLElement;
		trigger.click();
		
		// Wait for dropdown to open
		await new Promise(resolve => setTimeout(resolve, 250));
		
		// Click third option
		const options = container.querySelectorAll('[role="option"]');
		(options[2] as HTMLElement).click();
		
		// Wait for state update
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Selected should be updated
		expect(selected).toEqual(mockOptions[2]);
		
		// Selected text should update
		const updatedSelected = container.querySelector('.dropdown__selected');
		expect(updatedSelected?.textContent).toBe('Option 3');
	});

	test('dispatches selected event', async () => {
		// In Svelte 5, we need to check if the component dispatches events
		// For now, we'll test the selection behavior
		let selectedOption = { label: 'Select', value: 'select' };
		const { container } = render(Select, {
				options: mockOptions,
				get selected() { return selectedOption; },
				set selected(s: any) { selectedOption = s; }
			});
		
		// Open dropdown
		const trigger = container.querySelector('[data-testid="dropdown-trigger"]') as HTMLElement;
		trigger.click();
		
		// Wait for dropdown to open
		await new Promise(resolve => setTimeout(resolve, 250));
		
		// Click an option
		const options = container.querySelectorAll('[role="option"]');
		(options[1] as HTMLElement).click();
		
		// Wait for state update
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Selection should be updated
		expect(selectedOption).toEqual(mockOptions[1]);
	});

	test('applies variant styles', async () => {
		const variants = ['default', 'dark', 'light', 'pink', 'green', 'blue', 'yellow'] as const;
		
		for (const variant of variants) {
			const { container } = render(Select, {
					options: mockOptions,
					variant
				});
			
			// The variant class is applied to dropdown__select
			const select = container.querySelector('.dropdown__select');
			expect(select?.classList.contains(`dropdown__select--${variant}`)).toBe(true);
		}
	});

	test('applies square prop', async () => {
		const { container } = render(Select, {
				options: mockOptions,
				square: true
			});
		
		// Check if square prop is passed through - the Select component doesn't apply it directly
		// We'll check if the dropdown list has the square class when opened
		const select = container.querySelector('.dropdown__select');
		expect(select).toBeTruthy();
		
		// Open dropdown to check list
		const trigger = container.querySelector('[data-testid="dropdown-trigger"]') as HTMLElement;
		trigger.click();
		
		// Wait for dropdown to open
		await new Promise(resolve => setTimeout(resolve, 250));
		
		// List should have square class
		const list = container.querySelector('.dropdown__list');
		expect(list?.classList.contains('dropdown__list--square')).toBe(true);
	});

	test('marks active option with aria-selected', async () => {
		const { container } = render(Select, {
				options: mockOptions,
				value: 'opt2'
			});
		
		// Open dropdown
		const trigger = container.querySelector('[data-testid="dropdown-trigger"]') as HTMLElement;
		trigger.click();
		
		// Wait for dropdown to open
		await new Promise(resolve => setTimeout(resolve, 250));
		
		// Check aria-selected
		const options = container.querySelectorAll('[role="option"]');
		expect(options[0].getAttribute('aria-selected')).toBe('false');
		expect(options[1].getAttribute('aria-selected')).toBe('true');
		expect(options[2].getAttribute('aria-selected')).toBe('false');
		
		// Check active class
		expect(options[1].classList.contains('active')).toBe(true);
	});

	test('handles empty options array', async () => {
		const { container } = render(Select, {
				options: []
			});
		
		// Should still render
		const dropdown = container.querySelector('.dropdown');
		expect(dropdown).toBeTruthy();
		
		// Open dropdown
		const trigger = container.querySelector('[data-testid="dropdown-trigger"]') as HTMLElement;
		trigger.click();
		
		// Wait for dropdown to open
		await new Promise(resolve => setTimeout(resolve, 250));
		
		// Should have no options
		const options = container.querySelectorAll('[role="option"]');
		expect(options.length).toBe(0);
	});

	test('syncs value with selected option', async () => {
		// Test that the component syncs value changes to selected
		const { container } = render(Select, {
				options: mockOptions,
				value: 'opt3'
			});
		
		// Wait for component to mount and effects to run
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// UI should show the option corresponding to the value
		const selectedText = container.querySelector('.dropdown__selected');
		expect(selectedText?.textContent).toBe('Option 3');
		
		// Open dropdown to verify selection is synced
		const trigger = container.querySelector('[data-testid="dropdown-trigger"]') as HTMLElement;
		trigger.click();
		
		// Wait for dropdown to open
		await new Promise(resolve => setTimeout(resolve, 250));
		
		// Check that the correct option is marked as active
		const options = container.querySelectorAll('[role="option"]');
		expect(options[2].getAttribute('aria-selected')).toBe('true');
		expect(options[2].classList.contains('active')).toBe(true);
	});
});