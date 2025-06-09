<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot (sidebar to sidebar_1) making the component unusable -->
<script>
	import Toggle from '$lib/interactive/Toggle/Toggle.svelte';
	import theme from '$lib/theme/store';
	import { sidebar } from './store';
	import './SidebarLayout.css';
	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		$sidebar.toggled = false;
	});
</script>

<div class="layout layout--sidebar">
	<aside class="layout__sidebar" class:layout__sidebar--toggled={$sidebar.toggled}>
		<slot name="sidebar" />
		<div class="align-self-end">
			<Toggle id="theme-toggle" bind:toggled={$theme.darkMode}>
				<div slot="off" class="px-4">
					<div class="i-tabler-sun text-yellow-200" />
				</div>
				<div slot="on" class="px-4">
					<div class="i-tabler-moon text-purple-50" />
				</div>
			</Toggle>
		</div>
	</aside>
	<div class="layout__page">
		<slot />
	</div>
</div>
