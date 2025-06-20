import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import CardStory from './Card.story.svelte';

describe('Card Story Component', () => {
	test('renders story page with title', async () => {
		const screen = render(CardStory);

		// Check main heading
		const heading = await screen.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
		await expect.element(heading).toHaveTextContent('Card');
	});

	test('renders card variant examples', async () => {
		const screen = render(CardStory);

		// Check that variant sections exist
		const defaultTitle = await screen.getByText('Default Card');
		await expect.element(defaultTitle).toBeInTheDocument();

		const outlinedTitle = await screen.getByText('Outlined Card');
		await expect.element(outlinedTitle).toBeInTheDocument();

		const secondaryTitle = await screen.getByText('Secondary Card');
		await expect.element(secondaryTitle).toBeInTheDocument();
	});

	test('renders all card examples with proper structure', async () => {
		const { container } = render(CardStory);

		// Should have multiple cards
		const cards = container.querySelectorAll('.card');
		expect(cards.length).toBeGreaterThan(0);
		expect(cards.length).toBe(4); // Should have exactly 4 card examples

		// Verify card content is rendered
		const cardContent = container.querySelector('.card')?.textContent;
		expect(cardContent).toContain('This is the card content');
	});

	test('renders usage examples', async () => {
		const { container } = render(CardStory);

		// Check that usage headings exist (there are multiple)
		const usageHeadings = container.querySelectorAll('h4');
		const usageCount = Array.from(usageHeadings).filter((h) => h.textContent === 'Usage').length;
		expect(usageCount).toBeGreaterThan(0);
		expect(usageCount).toBe(4); // One for each card example

		// Check that code examples are rendered
		const codeBlocks = container.querySelectorAll('.hljs');
		expect(codeBlocks.length).toBeGreaterThan(0);
	});
});
