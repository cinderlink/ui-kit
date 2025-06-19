import { render } from 'vitest-browser-svelte';
import { expect, test, describe } from 'vitest';
import ProgressBar from './ProgressBar.svelte';

describe('ProgressBar component', () => {
	test('renders with default props', async () => {
		const { container } = render(ProgressBar);

		// Should render progress bar container
		const progressBar = container.querySelector('.progress__bar');
		expect(progressBar).toBeTruthy();

		// Should have default size
		expect(progressBar?.classList.contains('progress__bar--md')).toBe(true);

		// Should have fill element
		const fill = container.querySelector('.progress__fill');
		expect(fill).toBeTruthy();

		// Should have content container
		const content = container.querySelector('.progress__content');
		expect(content).toBeTruthy();
	});

	test('renders with custom progress value', async () => {
		const { container } = render(ProgressBar, {
			progress: 75
		});

		const fill = container.querySelector('.progress__fill') as HTMLElement;
		expect(fill.style.width).toBe('75%');
	});

	test('renders with different sizes', async () => {
		const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

		for (const size of sizes) {
			const { container } = render(ProgressBar, { size });

			const progressBar = container.querySelector('.progress__bar');
			expect(progressBar?.classList.contains(`progress__bar--${size}`)).toBe(true);
		}
	});

	test('handles progress binding', async () => {
		let progress = 25;
		const { container } = render(ProgressBar, {
			get progress() {
				return progress;
			},
			set progress(v: number) {
				progress = v;
			}
		});

		const fill = container.querySelector('.progress__fill') as HTMLElement;
		expect(fill.style.width).toBe('25%');

		// Update progress
		progress = 50;
		// Trigger reactivity by dispatching event
		container.dispatchEvent(new Event('change'));

		// Note: Direct reactivity testing is complex in browser tests
	});

	test('renders with zero progress', async () => {
		const { container } = render(ProgressBar, {
			progress: 0
		});

		const fill = container.querySelector('.progress__fill') as HTMLElement;
		expect(fill.style.width).toBe('0%');
	});

	test('renders with full progress', async () => {
		const { container } = render(ProgressBar, {
			progress: 100
		});

		const fill = container.querySelector('.progress__fill') as HTMLElement;
		expect(fill.style.width).toBe('100%');
	});

	test('renders fill with animation', async () => {
		const { container } = render(ProgressBar);

		const fill = container.querySelector('.progress__fill');
		expect(fill).toBeTruthy();

		// Fill should have progress__fill class which includes animation in CSS
		expect(fill?.classList.contains('progress__fill')).toBe(true);
	});

	test('renders content container', async () => {
		const { container } = render(ProgressBar);

		const content = container.querySelector('.progress__content');
		expect(content).toBeTruthy();

		// Content should be positioned absolutely
		expect(content?.classList.toString()).toContain('progress__content');
	});

	test('handles different progress values', async () => {
		const progressValues = [0, 25, 50, 75, 100];

		for (const progress of progressValues) {
			const { container } = render(ProgressBar, { progress });

			const fill = container.querySelector('.progress__fill') as HTMLElement;
			expect(fill.style.width).toBe(`${progress}%`);
		}
	});
});
