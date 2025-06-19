import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ModalStory from './Modal.story.svelte';

describe('Modal Story Component', () => {
	test('renders story page with title', async () => {
		const screen = render(ModalStory);

		// Check main heading
		const heading = await screen.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
		await expect.element(heading).toHaveTextContent('Modal');
	});

	test('has modal trigger button', async () => {
		const screen = render(ModalStory);

		// Should have button to open modal - use test id to avoid duplicates
		const triggerButton = await screen.getByTestId('open-modal-button');
		await expect.element(triggerButton).toBeInTheDocument();
	});

	test('opens modal when trigger clicked', async () => {
		const screen = render(ModalStory);

		// Click trigger button using test id
		const triggerButton = await screen.getByTestId('open-modal-button');
		await triggerButton.click();

		// Wait a bit for animation
		await new Promise((resolve) => setTimeout(resolve, 200));

		// Modal should be visible
		const modal = await screen.getByRole('dialog');
		await expect.element(modal).toBeInTheDocument();

		// Should have modal title using role
		const modalTitle = await screen.getByRole('heading', { name: 'Modal Title' });
		await expect.element(modalTitle).toBeInTheDocument();

		// Should have close button
		const closeButton = await screen.getByRole('button', { name: 'Close' });
		await expect.element(closeButton).toBeInTheDocument();
	});

	test('renders example section', async () => {
		const screen = render(ModalStory);

		// Should have example heading
		const exampleHeading = await screen.getByText('Example');
		await expect.element(exampleHeading).toBeInTheDocument();

		// Modal story shows one example with trigger button
		const { container } = render(ModalStory);
		const panels = container.querySelectorAll('.panel--surface');
		expect(panels.length).toBeGreaterThan(0);
	});

	test('renders usage section', async () => {
		const screen = render(ModalStory);

		// Check for usage heading
		const usageHeading = await screen.getByText('Usage');
		await expect.element(usageHeading).toBeInTheDocument();

		// Should have code example
		const { container } = render(ModalStory);
		const codeBlock = container.querySelector('.hljs');
		expect(codeBlock).toBeTruthy();
	});
});
