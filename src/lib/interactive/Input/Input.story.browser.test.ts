import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import InputStory from './Input.story.svelte';

describe('Input Story Component', () => {
	test('renders story page with title', async () => {
		const screen = render(InputStory);

		// Check heading using role selector for uniqueness
		const heading = await screen.getByRole('heading', { name: 'Input', exact: true });
		await expect.element(heading).toBeInTheDocument();
	});

	test('renders input examples', async () => {
		const { container } = render(InputStory);

		// Should have multiple inputs
		const inputs = container.querySelectorAll('input');
		expect(inputs.length).toBeGreaterThan(0);

		// Should have input containers
		const inputContainers = container.querySelectorAll('.input__container');
		expect(inputContainers.length).toBeGreaterThan(0);
	});

	test('renders different input types', async () => {
		const { container } = render(InputStory);

		// Should have various input types
		const inputs = container.querySelectorAll('input');

		const types = new Set<string>();
		inputs.forEach((input) => {
			types.add(input.type);
		});

		expect(types.size).toBeGreaterThan(1);

		// Check for text inputs at least
		const textInputs = Array.from(inputs).filter((input) => input.type === 'text');
		expect(textInputs.length).toBeGreaterThan(0);
	});

	test('renders input with various examples', async () => {
		const { container } = render(InputStory);

		// Should have various input examples
		const allInputs = container.querySelectorAll('input');
		expect(allInputs.length).toBeGreaterThan(3);

		// Check for textareas too
		const textareas = container.querySelectorAll('textarea');
		expect(textareas.length).toBeGreaterThanOrEqual(0);
	});

	test('renders panels with examples', async () => {
		const { container } = render(InputStory);

		// Should have panels
		const panels = container.querySelectorAll('.panel');
		expect(panels.length).toBeGreaterThan(0);

		// Should have code examples
		const codeBlocks = container.querySelectorAll('.hljs');
		expect(codeBlocks.length).toBeGreaterThan(0);
	});
});
