<script lang="ts">
	import type { BorderRadius, FlexAlign, FlexDirection, FlexJustify } from '$lib/unocss/types';
	import type { Size } from '$lib/theme/types';
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string | undefined;
		rounded?: BorderRadius;
		direction?: FlexDirection;
		align?: FlexAlign;
		justify?: FlexJustify;
		width?: `w-${string}`;
		height?: `h-${string}`;
		gap?: `gap-${string}`;
		size?: Size | 'slim';
		type?: 'button' | 'submit' | 'reset';
		variant?:
			| 'glass' // Default glass style
			| 'frosted' // Frosted glass
			| 'purple'
			| 'pink'
			| 'green'
			| 'blue'
			| 'yellow'
			| 'red'
			| 'outlined'
			| 'ghost';
		elevation?: number;
		disabled?: boolean;
		invert?: boolean;
		link?: boolean;
		classes?: string;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		href = undefined,
		rounded = 'rounded-2xl',
		direction = 'flex-row',
		align = 'items-center',
		justify = 'justify-center',
		width = 'w-auto',
		height = 'h-auto',
		gap = 'gap-2',
		size = 'md',
		type = 'button',
		variant = 'glass',
		elevation = 0,
		disabled = false,
		invert = false,
		link = false,
		classes = '',
		onclick,
		children,
		...rest
	}: Props = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="button button--{variant} button--{size} button--elevation-{elevation} {rounded} {direction} {align} {justify} {width} {height} {gap} {classes}"
	class:button--invert={invert}
	class:button--link={link}
	{disabled}
	{href}
	{type}
	{...rest}
	{onclick}
>
	{@render children?.()}
</svelte:element>

<style lang="postcss">
	/* Base glass button */
	.button {
		position: relative;
		overflow: hidden;
		display: inline-flex;
		font-weight: 600;
		font-size: 0.875rem;
		transition: var(--glass-transition);
		isolation: isolate;
		transform-style: preserve-3d;
		transform: translateZ(0);

		/* Enhanced glass base for better readability */
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
		backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
		-webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow:
			var(--glass-shadow),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);

		/* Better text contrast */
		color: rgba(0, 0, 0, 0.8);
		text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
	}

	/* Dark mode adjustments */
	:global(.dark) .button {
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.1) 0%,
			rgba(255, 255, 255, 0.05) 100%
		);
		border-color: rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
	}

	/* Glass overlay border effect */
	.button::before {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: inherit;
		padding: 1px;
		background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), transparent 40%);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		opacity: 0.5;
	}

	/* Glass refraction layer - subtle sweep on hover */
	.button::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(
			125deg,
			transparent 30%,
			rgba(255, 255, 255, 0.2) 45%,
			rgba(255, 255, 255, 0.1) 50%,
			transparent 70%
		);
		opacity: 0;
		transform: translateX(-100%) skewX(-15deg);
		transition: var(--glass-transition-slow);
		pointer-events: none;
	}

	/* Hover state - subtle lift */
	.button:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: var(--glass-shadow-hover);
	}

	.button:hover:not(:disabled)::after {
		opacity: 0.6;
		transform: translateX(100%) skewX(-15deg);
	}

	/* Active state - subtle press */
	.button:active:not(:disabled) {
		transform: translateY(0) scale(0.99);
		box-shadow: var(--glass-shadow-active);
	}

	/* Disabled state - frosted */
	.button:disabled {
		cursor: not-allowed;
		opacity: 0.6;
		filter: blur(0.5px) grayscale(0.5);
		backdrop-filter: blur(10px);
	}

	/* Variant: Frosted glass */
	.button--frosted {
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.25) 0%,
			rgba(255, 255, 255, 0.15) 100%
		);
		backdrop-filter: blur(40px) saturate(1.2);
		color: rgba(0, 0, 0, 0.9);
	}

	/* Tinted variants - subtle glass with hint of color */
	.button--purple {
		background: linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0.02) 100%);
		border-color: rgba(147, 51, 234, 0.15);
		color: rgba(88, 28, 135, 0.9);
	}

	.button--pink {
		background: linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(236, 72, 153, 0.02) 100%);
		border-color: rgba(236, 72, 153, 0.15);
		color: rgba(157, 23, 77, 0.9);
	}

	.button--green {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.02) 100%);
		border-color: rgba(34, 197, 94, 0.15);
		color: rgba(20, 83, 45, 0.9);
	}

	.button--blue {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%);
		border-color: rgba(59, 130, 246, 0.15);
		color: rgba(30, 58, 138, 0.9);
	}

	.button--yellow {
		background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%);
		border-color: rgba(245, 158, 11, 0.15);
		color: rgba(120, 53, 15, 0.9);
	}

	.button--red {
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%);
		border-color: rgba(239, 68, 68, 0.15);
		color: rgba(127, 29, 29, 0.9);
	}

	/* Outlined variant */
	.button--outlined {
		background: rgba(255, 255, 255, 0.02);
		border: 2px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
	}

	.button--outlined:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.3);
	}

	/* Ghost variant */
	.button--ghost {
		background: transparent;
		backdrop-filter: none;
		border: none;
		box-shadow: none;
		color: rgba(0, 0, 0, 0.7);
	}

	.button--ghost:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		box-shadow:
			0 8px 32px 0 rgba(31, 38, 135, 0.1),
			inset 0 0 0 1px rgba(255, 255, 255, 0.1);
	}

	/* Dark mode adjustments - fix text contrast */
	:global(.dark) .button {
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	:global(.dark) .button--frosted {
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.15) 0%,
			rgba(255, 255, 255, 0.08) 100%
		);
		color: rgba(255, 255, 255, 0.95);
	}

	:global(.dark) .button--purple {
		background: linear-gradient(
			135deg,
			rgba(167, 139, 250, 0.08) 0%,
			rgba(167, 139, 250, 0.03) 100%
		);
		border-color: rgba(167, 139, 250, 0.2);
		color: rgba(196, 181, 253, 0.9);
	}

	:global(.dark) .button--pink {
		background: linear-gradient(
			135deg,
			rgba(244, 114, 182, 0.08) 0%,
			rgba(244, 114, 182, 0.03) 100%
		);
		border-color: rgba(244, 114, 182, 0.2);
		color: rgba(251, 207, 232, 0.9);
	}

	:global(.dark) .button--green {
		background: linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(74, 222, 128, 0.03) 100%);
		border-color: rgba(74, 222, 128, 0.2);
		color: rgba(187, 247, 208, 0.9);
	}

	:global(.dark) .button--blue {
		background: linear-gradient(135deg, rgba(96, 165, 250, 0.08) 0%, rgba(96, 165, 250, 0.03) 100%);
		border-color: rgba(96, 165, 250, 0.2);
		color: rgba(191, 219, 254, 0.9);
	}

	:global(.dark) .button--yellow {
		background: linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(251, 191, 36, 0.03) 100%);
		border-color: rgba(251, 191, 36, 0.2);
		color: rgba(254, 240, 138, 0.9);
	}

	:global(.dark) .button--red {
		background: linear-gradient(
			135deg,
			rgba(248, 113, 113, 0.08) 0%,
			rgba(248, 113, 113, 0.03) 100%
		);
		border-color: rgba(248, 113, 113, 0.2);
		color: rgba(254, 226, 226, 0.9);
	}

	:global(.dark) .button--outlined {
		border-color: rgba(255, 255, 255, 0.2);
	}

	:global(.dark) .button--outlined:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.3);
	}

	:global(.dark) .button--ghost {
		color: rgba(255, 255, 255, 0.8);
	}

	/* Size variants */
	.button--xs {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		border-radius: 1rem;
	}

	.button--sm {
		padding: 0.375rem 1rem;
		font-size: 0.875rem;
		border-radius: 1.25rem;
	}

	.button--md {
		padding: 0.5rem 1.25rem;
		font-size: 1rem;
		border-radius: 1.5rem;
	}

	.button--lg {
		padding: 0.75rem 1.75rem;
		font-size: 1.125rem;
		border-radius: 1.75rem;
	}

	.button--xl {
		padding: 1rem 2.5rem;
		font-size: 1.25rem;
		border-radius: 2rem;
	}

	.button--slim {
		padding: 0.25rem 1rem;
		font-size: 0.875rem;
		border-radius: 1.25rem;
	}

	/* Focus visible */
	.button:focus-visible {
		outline: 2px solid rgba(147, 51, 234, 0.5);
		outline-offset: 2px;
	}

	/* Link button style */
	a.button.button--link {
		background: transparent;
		backdrop-filter: none;
		border: none;
		box-shadow: none;
		text-decoration: underline;
		font-weight: normal;
		color: rgba(147, 51, 234, 0.9);
	}

	:global(.dark) a.button.button--link {
		color: rgba(167, 139, 250, 0.9);
	}

	/* Accessibility: Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.button,
		.button::before {
			transition: none;
			animation: none;
		}
	}

	/* High contrast mode */
	@media (prefers-contrast: high) {
		.button {
			backdrop-filter: none;
			background: ButtonFace;
			color: ButtonText;
			border: 2px solid ButtonText;
		}
	}
</style>
