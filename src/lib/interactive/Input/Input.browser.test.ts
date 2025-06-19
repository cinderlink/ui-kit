import { render } from 'vitest-browser-svelte';
import { expect, test, describe } from 'vitest';
import Input from './Input.svelte';

describe('Input component', () => {
	test('renders with default props', async () => {
		const { container } = render(Input, {
			props: {
				id: 'test-input'
			}
		});
		
		// Input should render
		const input = container.querySelector('input');
		expect(input).toBeTruthy();
		expect(input?.type).toBe('text');
		
		// Should have wrapper
		const wrapper = container.querySelector('.input__container');
		expect(wrapper).toBeTruthy();
	});

	test('renders with label', async () => {
		const screen = render(Input, {
			props: {
				id: 'test-input',
				label: 'Test Label'
			}
		});
		
		// Should have label
		const label = await screen.getByText('Test Label');
		await expect.element(label).toBeInTheDocument();
		
		// Label should be associated with input
		const labelElement = await screen.getByLabelText('Test Label');
		await expect.element(labelElement).toBeInTheDocument();
	});

	test('renders with placeholder', async () => {
		const { container } = render(Input, {
			props: {
				id: 'test-input',
				placeholder: 'Enter text here'
			}
		});
		
		const input = container.querySelector('input');
		expect(input?.placeholder).toBe('Enter text here');
	});

	test('handles value binding', async () => {
		let value = 'initial';
		const { container } = render(Input, {
			props: {
				id: 'test-input',
				get value() { return value; },
				set value(v: string) { value = v; }
			}
		});
		
		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.value).toBe('initial');
		
		// Simulate typing
		input.value = 'updated';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		
		// Value should be updated
		expect(value).toBe('updated');
	});

	test('applies type variants', async () => {
		const types = ['text', 'email', 'password', 'number'] as const;
		
		for (const type of types) {
			const { container } = render(Input, {
				props: {
					id: `test-${type}`,
					type
				}
			});
			
			const input = container.querySelector('input');
			expect(input?.type).toBe(type);
		}
		
		// Test textarea type
		const { container: textareaContainer } = render(Input, {
			props: {
				id: 'test-textarea',
				type: 'textarea'
			}
		});
		const textarea = textareaContainer.querySelector('textarea');
		expect(textarea).toBeTruthy();
	});

	test('applies size variants', async () => {
		const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
		
		for (const size of sizes) {
			const { container } = render(Input, {
				props: {
					id: 'test-input',
					size
				}
			});
			
			const container_el = container.querySelector('.input__container');
			expect(container_el?.classList.contains(`input--${size}`)).toBe(true);
		}
	});

	test('renders disabled state', async () => {
		const { container } = render(Input, {
			props: {
				id: 'test-input',
				disabled: true
			}
		});
		
		const input = container.querySelector('input');
		expect(input?.disabled).toBe(true);
		
		// Input should have disabled attribute
		expect(input?.hasAttribute('disabled')).toBe(true);
	});

	test('renders with error state', async () => {
		const screen = render(Input, {
			props: {
				id: 'test-input',
				error: 'This field is required'
			}
		});
		
		// Should show error message
		const error = await screen.getByText('This field is required');
		await expect.element(error).toBeInTheDocument();
		
		// Container should have error class
		const { container } = render(Input, {
			props: {
				id: 'test-input',
				error: 'This field is required'
			}
		});
		const wrapper = container.querySelector('.input__container');
		expect(wrapper?.classList.contains('input--error')).toBe(true);
	});

	test('renders with icon', async () => {
		const { container } = render(Input, {
			props: {
				id: 'test-input',
				icon: 'i-tabler-search'
			}
		});
		
		// Should have icon
		const icon = container.querySelector('.i-tabler-search');
		expect(icon).toBeTruthy();
	});
});