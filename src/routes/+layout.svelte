<script lang="ts">
	import 'virtual:uno.css';
	import '../app.css';
	import Theme from '$lib/theme/Theme.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';
	import SidebarLayout from '$lib/layout/SidebarLayout/SidebarLayout.svelte';
	import Logo from '$lib/Logo.svelte';
	import Drawer from '$lib/content/Drawer/Drawer.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Theme>
	<SidebarLayout>
		{#snippet sidebar()}
				<div  class="flex-1 flex flex-col gap-4 items-start justify-start">
				<div class="flex w-full justify-center items-center">
					<Logo />
				</div>
				<div class="flex w-full justify-between items-center">
					<a id="brand" href="/">@cinderlink/ui-kit</a>
					<ThemeToggle />
				</div>
				<nav class="flex-1 flex flex-col gap-2">
					<Drawer label="Guides">
						<ul>
							<li>
								<a href="/guides/getting-started">Getting Started</a>
							</li>
							<li>
								<a href="https://swagmi.cinderlink.com">Swagmi Docs</a>
							</li>
						</ul>
					</Drawer>

					<Drawer label="Customization">
						<ul>
							<li>
								<a href="/themes/default">Default Theme</a>
							</li>
							<li>
								<a href="/themes/custom">Customization</a>
							</li>
							<li>
								<a href="/themes/community">Community Themes</a>
							</li>
						</ul>
					</Drawer>

					<Drawer label="Components">
						<ul>
							<li>
								<a href="/components/content">Content</a>
							</li>
							<li>
								<a href="/components/indicator">Indicator</a>
							</li>
							<li>
								<a href="/components/interactive">Interactive</a>
							</li>
							<li>
								<a href="/components/layout">Layout</a>
							</li>
							<li>
								<a href="/components/navigation">Navigation</a>
							</li>
						</ul>
					</Drawer>
				</nav>
			</div>
			{/snippet}
		<main>
			{@render children?.()}
		</main>
	</SidebarLayout>
</Theme>

<style>
	ul {
		@apply pl-2 py-2 flex flex-col gap-2;
	}
	ul > li {
		@apply px-4 py-2 rounded-md hover-(bg-purple-100) dark-(hover-bg-purple-900);
	}
	ul > li > a {
		@apply text-md text-purple-800 dark-(text-yellow-100);
	}
	main {
		@apply px-8 py-2 bg-purple-50/5 overflow-hidden;
	}
</style>
