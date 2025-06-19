import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ButtonStory from './Button.story.svelte';

describe('Button Story Component', () => {
	test('renders title and main content', async () => {
		const screen = render(ButtonStory);
		
		// Check that the main title is rendered - use level for h1
		const title = await screen.getByRole('heading', { level: 1 });
		await expect.element(title).toBeInTheDocument();
		await expect.element(title).toHaveTextContent('Button');
		
		// Check that the enhancement notice is rendered
		const notice = await screen.getByText('Enhanced Glassmorphism:');
		await expect.element(notice).toBeInTheDocument();
	});

	test('renders glass demo buttons', async () => {
		const screen = render(ButtonStory);
		
		// Check specific button texts
		const glassButton = await screen.getByText('Glass Button');
		await expect.element(glassButton).toBeInTheDocument();
		
		const frostedButton = await screen.getByText('Frosted Button');
		await expect.element(frostedButton).toBeInTheDocument();
		
		const purpleButton = await screen.getByText('Purple Tint');
		await expect.element(purpleButton).toBeInTheDocument();
		
		const outlinedButton = await screen.getByText('Outlined Glass');
		await expect.element(outlinedButton).toBeInTheDocument();
	});

	test('story page renders without errors', async () => {
		const screen = render(ButtonStory);
		
		// Has buttons - check a specific button exists
		const glassButton = await screen.getByRole('button', { name: 'Glass Button' });
		await expect.element(glassButton).toBeInTheDocument();
		
		// Check button has proper class using element assertions
		await expect.element(glassButton).toHaveClass(/button/);
		await expect.element(glassButton).toHaveClass(/button--glass/);
	});
});