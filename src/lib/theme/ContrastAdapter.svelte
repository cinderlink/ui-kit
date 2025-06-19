<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getLuminance,
		parseColor,
		getAverageImageColor,
		generateContrastVariables
	} from './contrast';
	import type { Snippet } from 'svelte';

	interface Props {
		/**
		 * Background color to adapt to (hex, rgb, rgba)
		 */
		backgroundColor?: string;
		/**
		 * Background image URL to analyze
		 */
		backgroundImage?: string;
		/**
		 * Whether to automatically detect background from parent
		 */
		autoDetect?: boolean;
		/**
		 * Custom class names
		 */
		classes?: string;
		/**
		 * Child content
		 */
		children?: Snippet;
	}

	let {
		backgroundColor,
		backgroundImage,
		autoDetect = false,
		classes = '',
		children
	}: Props = $props();

	let containerEl: HTMLDivElement;
	let contrastVars = $state<Record<string, string>>({});

	/**
	 * Analyze background and update contrast variables
	 */
	async function analyzeBackground() {
		let luminance = 0.5; // Default medium luminance

		// Analyze background color
		if (backgroundColor) {
			const rgb = parseColor(backgroundColor);
			if (rgb) {
				luminance = getLuminance(rgb.r, rgb.g, rgb.b);
			}
		}

		// Analyze background image
		else if (backgroundImage) {
			const img = new Image();
			img.crossOrigin = 'anonymous';

			await new Promise((resolve, reject) => {
				img.onload = resolve;
				img.onerror = reject;
				img.src = backgroundImage;
			});

			const avgColor = getAverageImageColor(img);
			luminance = getLuminance(avgColor.r, avgColor.g, avgColor.b);
		}

		// Auto-detect from parent element
		else if (autoDetect && containerEl) {
			const parent = containerEl.parentElement;
			if (parent) {
				const computedStyle = window.getComputedStyle(parent);
				const bgColor = computedStyle.backgroundColor;

				if (bgColor && bgColor !== 'transparent') {
					const rgb = parseColor(bgColor);
					if (rgb) {
						luminance = getLuminance(rgb.r, rgb.g, rgb.b);
					}
				}
			}
		}

		// Generate and apply contrast variables
		contrastVars = generateContrastVariables(luminance);
	}

	// Re-analyze when props change
	$effect(() => {
		if (backgroundColor || backgroundImage || autoDetect) {
			analyzeBackground();
		}
	});

	onMount(() => {
		// Initial analysis
		analyzeBackground();

		// Re-analyze on theme changes
		const observer = new MutationObserver(() => {
			if (autoDetect) {
				analyzeBackground();
			}
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		return () => observer.disconnect();
	});
</script>

<div
	bind:this={containerEl}
	class="contrast-adapter {classes}"
	style={Object.entries(contrastVars)
		.map(([k, v]) => `${k}: ${v}`)
		.join('; ')}
>
	{@render children?.()}
</div>

<style lang="postcss">
	.contrast-adapter {
		/* Apply contrast-aware glass variables to children */
		--glass-bg: linear-gradient(
			to bottom right,
			rgba(255, 255, 255, var(--glass-bg-opacity, 0.1)) 0%,
			rgba(255, 255, 255, calc(var(--glass-bg-opacity, 0.1) * 0.7)) 50%,
			rgba(255, 255, 255, calc(var(--glass-bg-opacity, 0.1) * 0.5)) 100%
		);

		--glass-border: 1px solid rgba(255, 255, 255, var(--glass-border-opacity, 0.15));

		--glass-shadow:
			0 8px 32px rgba(0, 0, 0, calc(0.12 * var(--glass-shadow-opacity, 1))),
			0 2px 8px rgba(0, 0, 0, calc(0.08 * var(--glass-shadow-opacity, 1))),
			inset 0 2px 0 0 rgba(255, 255, 255, var(--glass-highlight-opacity, 0.2)),
			inset 0 0 0 1px rgba(255, 255, 255, calc(var(--glass-border-opacity, 0.15) * 0.7));
	}
</style>
