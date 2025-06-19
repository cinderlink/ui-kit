import { render } from 'vitest-browser-svelte';
import { expect, test, describe, vi } from 'vitest';
import Panel from './Panel.svelte';

describe('Panel component', () => {
	test('renders with default props', async () => {
		const { container } = render(Panel);
		
		// Should render panel container
		const panel = container.querySelector('.panel');
		expect(panel).toBeTruthy();
		
		// Should have default variant and size
		expect(panel?.classList.contains('panel--glass')).toBe(true);
		expect(panel?.classList.contains('panel--depth-2')).toBe(true);
		expect(panel?.classList.contains('panel--md')).toBe(true);
		
		// Should be a div by default
		expect(panel?.tagName).toBe('DIV');
	});

	test('renders with different variants', async () => {
		const variants = [
			'glass', 'frosted', 'purple', 'pink', 'green', 
			'blue', 'yellow', 'red', 'surface', 'overlay'
		] as const;
		
		for (const variant of variants) {
			const { container } = render(Panel, {
				props: { variant }
			});
			
			const panel = container.querySelector('.panel');
			expect(panel?.classList.contains(`panel--${variant}`)).toBe(true);
		}
	});

	test('renders with different depths', async () => {
		const depths = [1, 2, 3, 4, 5] as const;
		
		for (const depth of depths) {
			const { container } = render(Panel, {
				props: { depth }
			});
			
			const panel = container.querySelector('.panel');
			expect(panel?.classList.contains(`panel--depth-${depth}`)).toBe(true);
		}
	});

	test('renders with different sizes', async () => {
		const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
		
		for (const size of sizes) {
			const { container } = render(Panel, {
				props: { size }
			});
			
			const panel = container.querySelector('.panel');
			expect(panel?.classList.contains(`panel--${size}`)).toBe(true);
		}
	});

	test('renders as anchor when href provided', async () => {
		const { container } = render(Panel, {
			props: {
				href: 'https://example.com'
			}
		});
		
		const panel = container.querySelector('.panel');
		expect(panel?.tagName).toBe('A');
		expect((panel as HTMLAnchorElement)?.href).toBe('https://example.com/');
	});

	test('renders with custom element', async () => {
		const { container } = render(Panel, {
			props: {
				el: 'section'
			}
		});
		
		const panel = container.querySelector('.panel');
		expect(panel?.tagName).toBe('SECTION');
	});

	test('applies interactive class', async () => {
		const { container } = render(Panel, {
			props: {
				interactive: true
			}
		});
		
		const panel = container.querySelector('.panel');
		expect(panel?.classList.contains('panel--interactive')).toBe(true);
	});

	test('applies custom classes', async () => {
		const { container } = render(Panel, {
			props: {
				classes: 'custom-panel test-class'
			}
		});
		
		const panel = container.querySelector('.panel');
		expect(panel?.classList.contains('custom-panel')).toBe(true);
		expect(panel?.classList.contains('test-class')).toBe(true);
	});

	test('handles click events', async () => {
		const handleClick = vi.fn();
		const { container } = render(Panel, {
			props: {
				onclick: handleClick
			}
		});
		
		const panel = container.querySelector('.panel') as HTMLElement;
		panel.click();
		
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test('renders with children content', async () => {
		const { container } = render(Panel);
		
		// Should render panel even without children
		const panel = container.querySelector('.panel');
		expect(panel).toBeTruthy();
	});

	test('applies custom flex classes', async () => {
		const { container } = render(Panel, {
			props: {
				flex: 'flex flex-row gap-4'
			}
		});
		
		const panel = container.querySelector('.panel');
		expect(panel?.classList.contains('flex-row')).toBe(true);
		expect(panel?.classList.contains('gap-4')).toBe(true);
	});

	test('applies custom rounded classes', async () => {
		const { container } = render(Panel, {
			props: {
				rounded: 'rounded-lg'
			}
		});
		
		const panel = container.querySelector('.panel');
		expect(panel?.classList.contains('rounded-lg')).toBe(true);
	});

	test('applies invert modifier', async () => {
		const { container } = render(Panel, {
			props: {
				invert: true
			}
		});
		
		const panel = container.querySelector('.panel');
		expect(panel?.classList.contains('panel--invert')).toBe(true);
	});

	test('spreads additional props', async () => {
		const { container } = render(Panel, {
			props: {
				'data-testid': 'test-panel',
				'aria-label': 'Test Panel'
			}
		});
		
		const panel = container.querySelector('.panel');
		expect(panel?.getAttribute('data-testid')).toBe('test-panel');
		expect(panel?.getAttribute('aria-label')).toBe('Test Panel');
	});
});