import { render } from 'vitest-browser-svelte';
import { expect, test, describe } from 'vitest';
import Button from './Button.svelte';

describe('Button component (Browser Tests)', () => {
	test('renders button with text', async () => {
		const screen = render(Button);

		// vitest-browser-svelte provides a simple API for rendering
		// We'll wait for better Svelte 5 snippet support
		const button = await screen.getByRole('button');
		await expect.element(button).toBeInTheDocument();
	});

	test('handles click events', async () => {
		let clicked = false;
		const screen = render(Button, {
			onclick: () => {
				clicked = true;
			}
		});

		const button = await screen.getByRole('button');
		await button.click();

		// Check that our click handler was called
		expect(clicked).toBe(true);
	});

	test('applies variant classes', async () => {
		const screen = render(Button, {
			variant: 'purple',
			size: 'lg'
		});

		const button = await screen.getByRole('button');
		await expect.element(button).toHaveClass('button--purple');
		await expect.element(button).toHaveClass('button--lg');
	});

	test('respects disabled state', async () => {
		const screen = render(Button, {
			disabled: true
		});

		const button = await screen.getByRole('button');
		await expect.element(button).toBeDisabled();
	});
});
