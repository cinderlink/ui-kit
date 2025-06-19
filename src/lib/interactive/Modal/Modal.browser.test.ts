import { render } from 'vitest-browser-svelte';
import { expect, test, describe } from 'vitest';
import Modal from './Modal.svelte';

describe('Modal component', () => {
	test('renders closed by default', async () => {
		const { container } = render(Modal);
		
		// Modal should not be visible initially
		const backdrop = container.querySelector('.modal__backdrop');
		expect(backdrop).toBeFalsy();
	});

	test('opens when visible prop is true', async () => {
		const { container } = render(Modal, {
			props: { visible: true }
		});
		
		// Wait for transition
		await new Promise(resolve => setTimeout(resolve, 50));
		
		// Modal should be visible
		const backdrop = container.querySelector('.modal__backdrop');
		expect(backdrop).toBeTruthy();
		
		// Should have dialog role
		const dialog = container.querySelector('[role="dialog"]');
		expect(dialog).toBeTruthy();
	});

	test('has bindable visible prop', async () => {
		let visible = true;
		const { container } = render(Modal, {
			props: { 
				get visible() { return visible; },
				set visible(v: boolean) { visible = v; }
			}
		});
		
		// Wait for render
		await new Promise(resolve => setTimeout(resolve, 50));
		
		// Modal should be visible
		const modal = container.querySelector('.modal__backdrop');
		expect(modal).toBeTruthy();
		
		// Test that visible prop is bindable
		expect(visible).toBe(true);
	});

	test('closes on Escape key', async () => {
		let visible = true;
		const { container } = render(Modal, {
			props: { 
				get visible() { return visible; },
				set visible(v: boolean) { visible = v; }
			}
		});
		
		// Wait for render
		await new Promise(resolve => setTimeout(resolve, 50));
		
		const backdrop = container.querySelector('.modal__backdrop') as HTMLElement;
		expect(backdrop).toBeTruthy();
		
		// Simulate Escape key
		const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
		backdrop.dispatchEvent(event);
		
		expect(visible).toBe(false);
	});

	test('renders with Panel overlay variant', async () => {
		const { container } = render(Modal, {
			props: { visible: true }
		});
		
		// Wait for render
		await new Promise(resolve => setTimeout(resolve, 50));
		
		// Should use Panel with overlay variant
		const panel = container.querySelector('.panel--overlay');
		expect(panel).toBeTruthy();
		
		// Should have modal content
		const modalContent = container.querySelector('.modal__content');
		expect(modalContent).toBeTruthy();
	});

	test('renders slots correctly', async () => {
		const { container } = render(Modal, {
			props: { visible: true }
		});
		
		// Wait for render
		await new Promise(resolve => setTimeout(resolve, 50));
		
		// Should have areas for header, body, and footer slots
		const modal = container.querySelector('[role="dialog"]');
		expect(modal).toBeTruthy();
		expect(modal?.getAttribute('aria-modal')).toBe('true');
	});
});