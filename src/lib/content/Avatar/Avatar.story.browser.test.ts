import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import AvatarStory from './Avatar.story.svelte';

describe('Avatar Story Component', () => {
	test('renders story page with title', async () => {
		const screen = render(AvatarStory);

		// Check main heading
		const heading = await screen.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
		await expect.element(heading).toHaveTextContent('Avatar');
	});

	test('renders avatar example', async () => {
		const { container } = render(AvatarStory);

		// Should have avatar wrapper
		const avatars = container.querySelectorAll('div.avatar');
		expect(avatars.length).toBeGreaterThan(0);

		// Check that avatar has an image
		const avatarImage = container.querySelector('img.avatar__image');
		expect(avatarImage).toBeTruthy();
	});

	test('renders interactive controls', async () => {
		const { container } = render(AvatarStory);

		// Should have input for image URL
		const imageInput = container.querySelector('input#image');
		expect(imageInput).toBeTruthy();

		// Should have dropdowns (not native selects)
		const dropdowns = container.querySelectorAll('.dropdown');
		expect(dropdowns.length).toBeGreaterThan(0);

		// Check for props panel (there may be multiple)
		const propsHeadings = container.querySelectorAll('h2');
		const hasPropsHeading = Array.from(propsHeadings).some((h) => h.textContent === 'Props');
		expect(hasPropsHeading).toBe(true);
	});

	test('renders avatar with status', async () => {
		const { container } = render(AvatarStory);

		// Should have avatar with status class
		const avatarWithStatus = container.querySelector('div.avatar--online');
		expect(avatarWithStatus).toBeTruthy();
	});
});
