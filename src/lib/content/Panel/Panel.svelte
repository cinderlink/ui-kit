<script lang="ts">
	import { fade, type FadeParams } from 'svelte/transition';
	import type { Size } from '$lib/unocss/types';
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string | undefined;
		el?: any;
		size?: Size;
		flex?: string;
		variant?: 
			| 'glass' // Default glass
			| 'frosted' // Frosted glass
			| 'purple'
			| 'pink'
			| 'green'
			| 'blue'
			| 'yellow'
			| 'red'
			| 'surface' // Subtle surface glass
			| 'overlay'; // Modal/overlay glass
		depth?: 1 | 2 | 3 | 4 | 5;
		interactive?: boolean;
		rounded?: string;
		classes?: string;
		invert?: boolean;
		transition?: FadeParams & { enable?: boolean } | undefined;
		children?: Snippet;
		onclick?: (event: MouseEvent) => void;
		[key: string]: any;
	}

	let {
		href = undefined,
		el = href ? 'a' : 'div',
		size = 'md',
		flex = 'flex flex-col gap-2',
		variant = 'glass',
		depth = 2,
		interactive = false,
		rounded = 'rounded-2xl',
		classes = '',
		invert = false,
		transition = undefined,
		children,
		onclick,
		...rest
	}: Props = $props();

	const smart = (node: Element, args: any) => args?.enable && fade(node, args);
</script>

<svelte:element this={el}
	{onclick}
	in:smart={transition}
	class="panel panel--{variant} panel--depth-{depth} panel--{size} {classes} {flex} {rounded}"
	class:panel--invert={invert}
	class:panel--interactive={interactive}
	{...{ ...rest, ...(el === 'a' ? { href } : {}) }}
>
	{@render children?.()}
</svelte:element>

<style lang="postcss">
	/* Base glass panel - matching Button style */
	.panel {
		position: relative;
		overflow: visible;
		transition: var(--glass-transition);
		isolation: isolate;
		transform-style: preserve-3d;
		transform: translateZ(0);
		
		/* Pure glass base */
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
		-webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
		border: var(--glass-border);
		box-shadow: var(--glass-shadow);
	}
	
	/* Smooth gradient overlay */
	.panel::before {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: inherit;
		padding: 1px;
		background: linear-gradient(
			to bottom right,
			rgba(255, 255, 255, 0.2),
			transparent 40%
		);
		-webkit-mask: 
			linear-gradient(#fff 0 0) content-box, 
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		opacity: 0.6;
	}

	/* Interactive hover state - subtle lift */
	.panel--interactive:hover {
		transform: translateY(-1px);
		box-shadow: var(--glass-shadow-hover);
	}

	/* Depth variants */
	.panel--depth-1 {
		backdrop-filter: blur(8px) saturate(1.3);
		box-shadow: 
			0 4px 16px 0 rgba(31, 38, 135, 0.1),
			inset 0 0 0 1px rgba(255, 255, 255, 0.08);
	}

	.panel--depth-2 {
		/* Default depth */
	}

	.panel--depth-3 {
		backdrop-filter: blur(24px) saturate(1.6);
		box-shadow: 
			0 12px 40px 0 rgba(31, 38, 135, 0.2),
			inset 0 0 0 1px rgba(255, 255, 255, 0.12),
			inset 0 -2px 12px 0 rgba(0, 0, 0, 0.12);
	}

	.panel--depth-4 {
		backdrop-filter: blur(32px) saturate(1.8);
		box-shadow: 
			0 16px 48px 0 rgba(31, 38, 135, 0.25),
			inset 0 0 0 1px rgba(255, 255, 255, 0.15),
			inset 0 -2px 16px 0 rgba(0, 0, 0, 0.15);
	}

	.panel--depth-5 {
		backdrop-filter: blur(40px) saturate(2);
		box-shadow: 
			0 20px 56px 0 rgba(31, 38, 135, 0.3),
			inset 0 0 0 1px rgba(255, 255, 255, 0.18),
			inset 0 -2px 20px 0 rgba(0, 0, 0, 0.18);
	}

	/* Variant: Frosted glass */
	.panel--frosted {
		background: var(--glass-bg-frosted);
		backdrop-filter: blur(var(--glass-blur-heavy)) saturate(1.2);
	}

	/* Variant: Surface - very subtle */
	.panel--surface {
		background: var(--glass-bg-surface);
		backdrop-filter: blur(var(--glass-blur-light)) saturate(1.2);
		border: var(--glass-border-light);
		box-shadow: 
			0 4px 16px 0 rgba(31, 38, 135, 0.08),
			inset 0 0 0 1px rgba(255, 255, 255, 0.05);
	}

	/* Variant: Overlay - for modals */
	.panel--overlay {
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.12) 0%,
			rgba(255, 255, 255, 0.08) 100%
		);
		backdrop-filter: blur(24px) saturate(1.8);
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 
			0 24px 64px 0 rgba(31, 38, 135, 0.3),
			inset 0 0 0 1px rgba(255, 255, 255, 0.15),
			inset 0 -2px 16px 0 rgba(0, 0, 0, 0.15);
	}

	/* Tinted variants - subtle glass with hint of color */
	.panel--purple {
		background: linear-gradient(
			135deg,
			rgba(147, 51, 234, 0.03) 0%,
			rgba(147, 51, 234, 0.01) 100%
		);
		border-color: rgba(147, 51, 234, 0.1);
	}

	.panel--pink {
		background: linear-gradient(
			135deg,
			rgba(236, 72, 153, 0.03) 0%,
			rgba(236, 72, 153, 0.01) 100%
		);
		border-color: rgba(236, 72, 153, 0.1);
	}

	.panel--green {
		background: linear-gradient(
			135deg,
			rgba(34, 197, 94, 0.03) 0%,
			rgba(34, 197, 94, 0.01) 100%
		);
		border-color: rgba(34, 197, 94, 0.1);
	}

	.panel--blue {
		background: linear-gradient(
			135deg,
			rgba(59, 130, 246, 0.03) 0%,
			rgba(59, 130, 246, 0.01) 100%
		);
		border-color: rgba(59, 130, 246, 0.1);
	}

	.panel--yellow {
		background: linear-gradient(
			135deg,
			rgba(245, 158, 11, 0.03) 0%,
			rgba(245, 158, 11, 0.01) 100%
		);
		border-color: rgba(245, 158, 11, 0.1);
	}

	.panel--red {
		background: linear-gradient(
			135deg,
			rgba(239, 68, 68, 0.03) 0%,
			rgba(239, 68, 68, 0.01) 100%
		);
		border-color: rgba(239, 68, 68, 0.1);
	}

	/* Dark mode adjustments - inherits from CSS variables */
	:global(.dark) .panel {
		/* CSS variables handle the dark mode styling */
	}

	:global(.dark) .panel--frosted {
		background: var(--glass-bg-frosted);
	}

	:global(.dark) .panel--surface {
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.03) 0%,
			rgba(255, 255, 255, 0.01) 100%
		);
		border-color: rgba(255, 255, 255, 0.08);
	}

	:global(.dark) .panel--purple {
		background: linear-gradient(
			135deg,
			rgba(167, 139, 250, 0.06) 0%,
			rgba(167, 139, 250, 0.02) 100%
		);
		border-color: rgba(167, 139, 250, 0.15);
	}

	:global(.dark) .panel--pink {
		background: linear-gradient(
			135deg,
			rgba(244, 114, 182, 0.06) 0%,
			rgba(244, 114, 182, 0.02) 100%
		);
		border-color: rgba(244, 114, 182, 0.15);
	}

	:global(.dark) .panel--green {
		background: linear-gradient(
			135deg,
			rgba(74, 222, 128, 0.06) 0%,
			rgba(74, 222, 128, 0.02) 100%
		);
		border-color: rgba(74, 222, 128, 0.15);
	}

	:global(.dark) .panel--blue {
		background: linear-gradient(
			135deg,
			rgba(96, 165, 250, 0.06) 0%,
			rgba(96, 165, 250, 0.02) 100%
		);
		border-color: rgba(96, 165, 250, 0.15);
	}

	:global(.dark) .panel--yellow {
		background: linear-gradient(
			135deg,
			rgba(251, 191, 36, 0.06) 0%,
			rgba(251, 191, 36, 0.02) 100%
		);
		border-color: rgba(251, 191, 36, 0.15);
	}

	:global(.dark) .panel--red {
		background: linear-gradient(
			135deg,
			rgba(248, 113, 113, 0.06) 0%,
			rgba(248, 113, 113, 0.02) 100%
		);
		border-color: rgba(248, 113, 113, 0.15);
	}

	/* Size variants */
	.panel--xs {
		padding: 0.5rem;
	}

	.panel--sm {
		padding: 0.75rem;
	}

	.panel--md {
		padding: 1rem;
	}

	.panel--lg {
		padding: 1.5rem;
	}

	.panel--xl {
		padding: 2rem;
	}

	/* Accessibility: Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.panel {
			transition: none;
		}
	}

	/* High contrast mode */
	@media (prefers-contrast: high) {
		.panel {
			backdrop-filter: none;
			background: Canvas;
			border: 2px solid CanvasText;
		}
	}
</style>