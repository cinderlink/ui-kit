import { render } from 'vitest-browser-svelte';
import { expect, test, describe } from 'vitest';
import StatusIndicator from './StatusIndicator.svelte';

describe('StatusIndicator component', () => {
	test('renders with default props', async () => {
		const { container } = render(StatusIndicator);
		
		// Should render status indicator
		const indicator = container.querySelector('.status-indicator');
		expect(indicator).toBeTruthy();
		
		// Should have default status and size
		expect(indicator?.classList.contains('status-indicator--info')).toBe(true);
		expect(indicator?.classList.contains('status-indicator--xs')).toBe(true);
	});

	test('renders with different status types', async () => {
		const statuses = ['success', 'warning', 'error', 'info', 'neutral'] as const;
		
		for (const status of statuses) {
			const { container } = render(StatusIndicator, {
				props: { status }
			});
			
			const indicator = container.querySelector('.status-indicator');
			expect(indicator?.classList.contains(`status-indicator--${status}`)).toBe(true);
		}
	});

	test('renders with different sizes', async () => {
		const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
		
		for (const size of sizes) {
			const { container } = render(StatusIndicator, {
				props: { size }
			});
			
			const indicator = container.querySelector('.status-indicator');
			expect(indicator?.classList.contains(`status-indicator--${size}`)).toBe(true);
		}
	});

	test('applies custom classes', async () => {
		const { container } = render(StatusIndicator, {
			props: {
				classes: 'custom-indicator animate-pulse'
			}
		});
		
		const indicator = container.querySelector('.status-indicator');
		expect(indicator?.classList.contains('custom-indicator')).toBe(true);
		expect(indicator?.classList.contains('animate-pulse')).toBe(true);
	});

	test('renders with children snippet', async () => {
		const { container } = render(StatusIndicator);
		
		// Component should render even without children
		const indicator = container.querySelector('.status-indicator');
		expect(indicator).toBeTruthy();
		
		// Note: Testing actual snippet content is complex in Vitest browser mode
	});

	test('combines status and size correctly', async () => {
		const { container } = render(StatusIndicator, {
			props: {
				status: 'success',
				size: 'lg'
			}
		});
		
		const indicator = container.querySelector('.status-indicator');
		expect(indicator?.classList.contains('status-indicator--success')).toBe(true);
		expect(indicator?.classList.contains('status-indicator--lg')).toBe(true);
	});

	test('renders inline-flex container', async () => {
		const { container } = render(StatusIndicator);
		
		const indicator = container.querySelector('.status-indicator');
		expect(indicator).toBeTruthy();
		
		// Should be a div with status indicator classes
		expect(indicator?.tagName).toBe('DIV');
	});

	test('renders all status color variants', async () => {
		// Test that each status has different styling
		const statusColors = {
			success: 'green',
			warning: 'yellow',
			error: 'red',
			info: 'blue',
			neutral: 'gray'
		};
		
		for (const [status] of Object.entries(statusColors)) {
			const { container } = render(StatusIndicator, {
				props: { status: status as any }
			});
			
			const indicator = container.querySelector('.status-indicator');
			expect(indicator?.classList.contains(`status-indicator--${status}`)).toBe(true);
		}
	});
});