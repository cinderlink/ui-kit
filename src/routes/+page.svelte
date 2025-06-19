<svelte:head>
	<title>@cinderlink/ui-kit</title>
</svelte:head>

<div class="page-content">
	<div class="glass-panel">
		<h1 class="text-4xl font-bold mb-8 text-purple-900 dark:text-white">Customizable Svelte UI Kit</h1>
		<p class="text-lg mb-8 leading-relaxed text-gray-800 dark:text-gray-100">
			@cinderlink/ui-kit presents a collection of Svelte components for easily building complex
			<a href="https://kit.svelte.dev/" class="glass-link">SvelteKit</a> Web3 applications. @cinderlink/ui-kit uses
			<a href="https://unocss.dev" class="glass-link">unocss</a>,
			<a href="https://framework.cinderlink.com" class="glass-link">@cinderlink/client</a>
			and
			<a href="https://swagmi.cinderlink.com" class="glass-link">swagmi</a>.
		</p>

		<div class="grid md:grid-cols-2 gap-6 mt-8">
			<div class="glass-section">
				<h3 class="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-100">Getting Started</h3>
				<p class="text-base leading-relaxed text-gray-800 dark:text-gray-100">
					See the <a href="/guides/installation" class="glass-link">Installation Guide</a> for instructions on how to install
					and use @cinderlink/ui-kit in your SvelteKit application.
				</p>
			</div>

			<div class="glass-section">
				<h3 class="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-100">Components</h3>
				<p class="text-base leading-relaxed text-gray-800 dark:text-gray-100">
					@cinderlink/ui-kit is ultimately a collection of Svelte components. Each component is designed
					to be highly customizable, and can be used in a variety of ways. See the <a href="/components/content"
						class="glass-link">Components</a>
					page for a full list of components and their documentation.
				</p>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.page-content {
		@apply w-full px-8 py-8 pb-16;
		background: transparent;
	}

	.glass-panel {
		@apply relative p-8 rounded-3xl;
		background: var(--glass-bg-frosted);
		backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
		-webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
		border: var(--glass-border);
		box-shadow: var(--glass-shadow);
		transition: var(--glass-transition);
	}
	
	.glass-panel::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, 
			transparent, 
			rgba(255, 255, 255, 0.3), 
			transparent
		);
		border-radius: 1.5rem 1.5rem 0 0;
		opacity: 0.8;
	}
	
	:global(.dark) .glass-panel::before {
		background: linear-gradient(90deg, 
			transparent, 
			rgba(255, 255, 255, 0.1), 
			transparent
		);
		opacity: 0.6;
	}
	
	.glass-section {
		@apply p-6 rounded-2xl;
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
		-webkit-backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
		border: var(--glass-border-light);
		box-shadow: var(--glass-shadow);
		transition: var(--glass-transition);
	}
	
	.glass-section:hover {
		transform: translateY(-2px);
		box-shadow: var(--glass-shadow-hover);
		border-color: rgba(147, 51, 234, 0.3);
	}
	
	.glass-link {
		@apply text-purple-600 dark:text-purple-400 font-medium;
		@apply px-2 py-1 rounded-lg transition-all duration-200 ease-out;
		@apply hover:bg-purple-100/50 dark:hover:bg-purple-800/30;
		@apply hover:text-purple-800 dark:hover:text-purple-200;
		text-decoration: none;
		background: linear-gradient(135deg, 
			rgba(147, 51, 234, 0.1), 
			rgba(147, 51, 234, 0.05)
		);
		border: 1px solid rgba(147, 51, 234, 0.2);
	}
	
	.glass-link:hover {
		background: linear-gradient(135deg, 
			rgba(147, 51, 234, 0.2), 
			rgba(147, 51, 234, 0.1)
		);
		border-color: rgba(147, 51, 234, 0.4);
		transform: translateY(-1px);
	}
</style>
