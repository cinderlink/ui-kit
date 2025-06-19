import { render } from 'vitest-browser-svelte';
import { expect, test, describe } from 'vitest';
import Avatar from './Avatar.svelte';

describe('Avatar component', () => {
	test('renders with default props', async () => {
		const { container } = render(Avatar);
		
		// Avatar should render wrapper div
		const avatar = container.querySelector('div.avatar');
		expect(avatar).toBeTruthy();
		
		// Should have default size
		expect(avatar?.classList.contains('avatar--md')).toBe(true);
	});

	test('renders with image and name', async () => {
		const image = 'https://example.com/avatar.jpg';
		const name = 'User Avatar';
		
		const { container } = render(Avatar, { image, name });
		
		const img = container.querySelector('img.avatar__image') as HTMLImageElement;
		expect(img).toBeTruthy();
		expect(img.src).toBe(image);
		expect(img.alt).toBe(name);
	});

	test('applies different sizes', async () => {
		const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
		
		for (const size of sizes) {
			const { container } = render(Avatar, { size, image: 'test.jpg' });
			
			const avatar = container.querySelector('div.avatar');
			expect(avatar?.classList.contains(`avatar--${size}`)).toBe(true);
		}
	});

	test('applies status variants', async () => {
		const statuses = ['online', 'offline', 'busy', 'away'] as const;
		
		for (const status of statuses) {
			const { container } = render(Avatar, { status, image: 'test.jpg' });
			
			const avatar = container.querySelector('div.avatar');
			expect(avatar?.classList.contains(`avatar--${status}`)).toBe(true);
		}
	});

	test('renders with custom class', async () => {
		const customClass = 'custom-avatar-class';
		const { container } = render(Avatar, { classes: customClass });
		
		const avatar = container.querySelector('div.avatar');
		expect(avatar?.classList.contains(customClass)).toBe(true);
	});

	test('renders without image when not provided', async () => {
		const { container } = render(Avatar);
		
		// Should have wrapper but no image
		const avatar = container.querySelector('div.avatar');
		expect(avatar).toBeTruthy();
		
		const img = container.querySelector('img.avatar__image');
		expect(img).toBeFalsy();
	});
});