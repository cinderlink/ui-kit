import { render } from 'vitest-browser-svelte';
import { expect, test, describe, vi } from 'vitest';
import ImageUpload from './ImageUpload.svelte';

describe('ImageUpload component', () => {
	test('renders with default props', async () => {
		const { container } = render(ImageUpload);
		
		// Should render input container
		const inputContainer = container.querySelector('.input__container');
		expect(inputContainer).toBeTruthy();
		
		// Should have file input
		const fileInput = container.querySelector('input[type="file"]');
		expect(fileInput).toBeTruthy();
		
		// Should have upload button
		const uploadButton = container.querySelector('.input--file__button');
		expect(uploadButton).toBeTruthy();
	});

	test('renders with label', async () => {
		const { container } = render(ImageUpload, {
			props: {
				label: 'Profile Picture'
			}
		});
		
		// Should have label
		const label = container.querySelector('label');
		expect(label?.textContent).toBe('Profile Picture');
	});

	test('renders with different sizes', async () => {
		const sizes = ['sm', 'md', 'lg', 'xl'] as const;
		
		for (const size of sizes) {
			const { container } = render(ImageUpload, {
				props: { size }
			});
			
			const button = container.querySelector('.input--file__button');
			expect(button?.classList.contains(`input--file__button--${size}`)).toBe(true);
		}
	});

	test('shows upload text when not selected', async () => {
		const { container } = render(ImageUpload, {
			props: {
				selected: false
			}
		});
		
		const buttonText = container.querySelector('.input--file__text');
		expect(buttonText?.textContent?.trim()).toBe('Upload');
	});

	test('shows change text when selected', async () => {
		const { container } = render(ImageUpload, {
			props: {
				selected: true
			}
		});
		
		const buttonText = container.querySelector('.input--file__text');
		expect(buttonText?.textContent?.trim()).toBe('Change');
	});

	test('renders avatar preview', async () => {
		const { container } = render(ImageUpload);
		
		// Should have avatar component as preview
		const avatar = container.querySelector('.avatar');
		expect(avatar).toBeTruthy();
	});

	test('renders with custom image', async () => {
		const { container } = render(ImageUpload, {
			props: {
				image: 'data:image/png;base64,test'
			}
		});
		
		// Avatar should receive the image prop
		const avatar = container.querySelector('.avatar');
		expect(avatar).toBeTruthy();
	});

	test('handles file input binding', async () => {
		let inputRef: HTMLInputElement | undefined;
		const { container } = render(ImageUpload, {
			props: {
				get inputRef() { return inputRef; },
				set inputRef(ref: HTMLInputElement | undefined) { inputRef = ref; }
			}
		});
		
		// Should bind the input reference
		const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
		expect(fileInput).toBeTruthy();
	});

	test('button triggers file input click', async () => {
		const { container } = render(ImageUpload);
		
		const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
		const clickSpy = vi.spyOn(fileInput, 'click');
		
		const button = container.querySelector('.input--file__button') as HTMLElement;
		button.click();
		
		expect(clickSpy).toHaveBeenCalled();
	});

	test('renders with pencil icon', async () => {
		const { container } = render(ImageUpload);
		
		const icon = container.querySelector('.i-tabler-pencil');
		expect(icon).toBeTruthy();
		expect(icon?.parentElement?.classList.contains('input--file__icon')).toBe(true);
	});

	test('applies correct styling classes', async () => {
		const { container } = render(ImageUpload);
		
		// Check button styling
		const button = container.querySelector('.input--file__button');
		expect(button).toBeTruthy();
		
		// Check icon styling
		const icon = container.querySelector('.input--file__icon');
		expect(icon).toBeTruthy();
	});

	test('input has correct attributes', async () => {
		const { container } = render(ImageUpload);
		
		const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
		expect(fileInput.type).toBe('file');
		expect(fileInput.id).toBe('avatar');
		expect(fileInput.classList.contains('hidden')).toBe(true);
	});
});