import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ImageUploadStory from './ImageUpload.story.svelte';

describe('ImageUpload Story Component', () => {
	test('renders story page with title', async () => {
		const { container } = render(ImageUploadStory);
		
		// Check for heading
		const headings = container.querySelectorAll('h1, h2, h3');
		let hasImageUploadHeading = false;
		
		headings.forEach(heading => {
			const text = heading.textContent || '';
			if (text.includes('Image') || text.includes('Upload')) {
				hasImageUploadHeading = true;
			}
		});
		
		expect(hasImageUploadHeading).toBe(true);
	});

	test('renders image upload examples', async () => {
		const { container } = render(ImageUploadStory);
		
		// Should have file inputs
		const fileInputs = container.querySelectorAll('input[type="file"]');
		expect(fileInputs.length).toBeGreaterThan(0);
		
		// Should have upload buttons
		const uploadButtons = container.querySelectorAll('.input--file__button');
		expect(uploadButtons.length).toBeGreaterThan(0);
	});

	test('renders different sizes', async () => {
		const { container } = render(ImageUploadStory);
		
		// Should show different size variants
		const buttons = container.querySelectorAll('.input--file__button');
		const sizes = new Set<string>();
		
		buttons.forEach(button => {
			const classes = Array.from(button.classList);
			classes.forEach(cls => {
				if (cls.match(/input--file__button--(sm|md|lg|xl)/)) {
					sizes.add(cls);
				}
			});
		});
		
		// Should have at least one size variant
		expect(sizes.size).toBeGreaterThanOrEqual(1);
	});

	test('renders avatar previews', async () => {
		const { container } = render(ImageUploadStory);
		
		// Should have avatar components for preview
		const avatars = container.querySelectorAll('.avatar');
		expect(avatars.length).toBeGreaterThan(0);
	});

	test('renders panels with examples', async () => {
		const { container } = render(ImageUploadStory);
		
		// Should have panels
		const panels = container.querySelectorAll('.panel');
		expect(panels.length).toBeGreaterThan(0);
		
		// Panels should contain image upload components
		let uploadsInPanels = 0;
		panels.forEach(panel => {
			const uploads = panel.querySelectorAll('.input--file__button');
			uploadsInPanels += uploads.length;
		});
		expect(uploadsInPanels).toBeGreaterThan(0);
	});

	test('renders documentation structure', async () => {
		const { container } = render(ImageUploadStory);
		
		// Should have descriptive content
		const pageText = container.textContent?.toLowerCase() || '';
		const hasDocumentation = pageText.includes('image') || 
		                        pageText.includes('upload') || 
		                        pageText.includes('file');
		
		expect(hasDocumentation).toBe(true);
	});

	test('shows upload interface elements', async () => {
		const { container } = render(ImageUploadStory);
		
		// Should have upload icons
		const uploadIcons = container.querySelectorAll('.i-tabler-pencil');
		expect(uploadIcons.length).toBeGreaterThan(0);
		
		// Should have file input containers
		const inputContainers = container.querySelectorAll('.input__container');
		expect(inputContainers.length).toBeGreaterThan(0);
	});

	test('renders interactive upload areas', async () => {
		const { container } = render(ImageUploadStory);
		
		// Upload buttons should be clickable
		const buttons = container.querySelectorAll('.input--file__button');
		expect(buttons.length).toBeGreaterThan(0);
		
		// Each button should have associated file input
		buttons.forEach(button => {
			const container = button.closest('.input__container');
			const fileInput = container?.querySelector('input[type="file"]');
			expect(fileInput).toBeTruthy();
		});
	});
});