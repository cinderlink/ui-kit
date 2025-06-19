<script lang="ts">
	import type { Color } from '$lib/unocss';

	interface Props {
		icon?: `i-tabler-${string}`;
		count?: number;
		color?: Color;
		title?: string;
	}

	let {
		icon = 'i-tabler-eye-off',
		count = 0,
		color = 'purple',
		title = ''
	}: Props = $props();
</script>

<div class="attestation-icon">
	<div class="attestation-icon__pill" {title}>
		<div class="{icon} attestation-icon__icon attestation-icon__icon--{color}"></div>
		{#if count > 0}
			<div class="attestation-icon__count attestation-icon__count--{color}">{count}</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.attestation-icon {
		@apply flex items-center justify-center;
	}

	.attestation-icon__pill {
		@apply flex items-center justify-center bg-gray-100 dark-bg-purple-800 px-2 rounded-lg;
	}

	.attestation-icon__icon {
		@apply text-lg px-2;
	}

	.attestation-icon__count {
		@apply text-md px-1;
	}

	.attestation-icon__icon--purple {
		@apply bg-purple-500 dark-bg-purple-100;
	}

	.attestation-icon__count--purple {
		@apply text-purple-500 dark-text-purple-100;
	}

	.attestation-icon__icon--green {
		@apply bg-green-600 dark-bg-green-100;
	}

	.attestation-icon__count--green {
		@apply text-green-600 dark-text-green-100;
	}

	.attestation-icon__icon--red {
		@apply bg-red-600 dark-bg-red-600;
	}

	.attestation-icon__count--red {
		@apply text-red-600 dark-text-red-600;
	}

	.attestation-icon__icon--yellow {
		@apply bg-yellow-600 dark-bg-yellow-300;
	}

	.attestation-icon__count--yellow {
		@apply text-yellow-600 dark-text-yellow-300;
	}

	.attestation-icon__icon--blue {
		@apply bg-blue-500 dark-bg-blue-100;
	}

	.attestation-icon__count--blue {
		@apply text-blue-500 dark-text-blue-100;
	}

	.attestation-icon__icon--gray {
		@apply bg-gray-500 dark-bg-gray-100;
	}

	.attestation-icon__count--gray {
		@apply text-gray-500 dark-text-gray-100;
	}

	.attestation-icon__icon--indigo {
		@apply bg-indigo-500 dark-bg-indigo-100;
	}

	.attestation-icon__count--indigo {
		@apply text-indigo-500 dark-text-indigo-100;
	}

	.attestation-icon__icon--pink {
		@apply bg-pink-700 dark-bg-pink-300;
	}

	.attestation-icon__count--pink {
		@apply text-pink-700 dark-text-pink-300;
	}

	.attestation-icon__icon--orange {
		@apply bg-orange-500 dark-bg-orange-400;
	}

	.attestation-icon__count--orange {
		@apply text-orange-500 dark-text-orange-400;
	}
</style>
