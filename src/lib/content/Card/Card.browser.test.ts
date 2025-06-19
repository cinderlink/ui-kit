import { render } from 'vitest-browser-svelte';
import { expect, test, describe } from 'vitest';
import Card from './Card.svelte';

describe('Card component', () => {
	test('renders with default props', async () => {
		const { container } = render(Card);
		
		// Find card by class selector
		const card = container.querySelector('.card');
		expect(card).toBeTruthy();
		expect(card?.classList.contains('card--default')).toBe(true);
		expect(card?.classList.contains('card--neutral')).toBe(true);
	});

	test('renders with title', async () => {
		const screen = render(Card, {
				title: 'Test Title'
			});
		
		// Check title renders
		const title = await screen.getByText('Test Title');
		await expect.element(title).toBeInTheDocument();
	});

	test('applies different variants', async () => {
		const variants = ['default', 'outlined', 'secondary'] as const;
		
		for (const variant of variants) {
			const { container } = render(Card, { variant });
			
			const card = container.querySelector('.card');
			expect(card?.classList.contains(`card--${variant}`)).toBe(true);
		}
	});

	test('handles click events', async () => {
		let clicked = false;
		const screen = render(Card, {
				onclick: () => { clicked = true; }
			});
		
		// When onclick is provided, card renders as a button
		const card = await screen.getByRole('button');
		await card.click();
		
		expect(clicked).toBe(true);
	});

	test('applies color variants', async () => {
		const colors = ['neutral', 'purple', 'green', 'blue', 'pink', 'yellow', 'red'] as const;
		
		for (const color of colors) {
			const { container } = render(Card, { color });
			
			const card = container.querySelector('.card');
			expect(card?.classList.contains(`card--${color}`)).toBe(true);
		}
	});
});