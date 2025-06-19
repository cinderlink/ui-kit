<script lang="ts">
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Card from '$lib/content/Card/Card.svelte';
	import Breadcrumb from '$lib/navigation/Breadcrumb/Breadcrumb.svelte';
	import CodeEditor from '$lib/markup/CodeEditor/CodeEditor.svelte';

	let basicCustomization = `// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
  ],
  theme: {
    colors: {
      // Override default purple
      purple: {
        50: '#f8f7ff',
        500: '#7c3aed',  // Your brand purple
        900: '#4c1d95'
      },
      
      // Add custom brand colors
      brand: {
        primary: '#7c3aed',
        secondary: '#f59e0b',
        accent: '#ef4444'
      }
    },
    
    // Custom spacing
    spacing: {
      '18': '4.5rem',
      '88': '22rem'
    },
    
    // Custom font sizes
    fontSize: {
      'xxs': '0.625rem',
      'huge': '4rem'
    }
  }
});`;

	let componentTheme =
		`// components/CustomButton.svelte
<` +
		`script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'accent';
    children?: import('svelte').Snippet;
  }
  
  let { variant = 'primary', children }: Props = $props();
  
  let classes = $derived(() => {
    switch (variant) {
      case 'primary':
        return 'bg-brand-primary hover:bg-brand-primary/90 text-white';
      case 'secondary':
        return 'bg-brand-secondary hover:bg-brand-secondary/90 text-white';
      case 'accent':
        return 'bg-brand-accent hover:bg-brand-accent/90 text-white';
      default:
        return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  });
<` +
		`/script>

<button class="px-4 py-2 rounded-lg transition-colors {classes}">
  {@render children?.()}
</button>`;

	let darkModeCustom = `// Custom dark mode colors
// uno.config.ts
export default defineConfig({
  theme: {
    colors: {
      // Light and dark variants
      surface: {
        light: '#ffffff',
        dark: '#1a1a1a'
      },
      text: {
        light: '#1f2937',
        dark: '#f9fafb'
      }
    }
  },
  
  // Custom dark mode rules
  rules: [
    [
      'bg-surface',
      {
        'background-color': 'rgb(255 255 255)',
        '@media (prefers-color-scheme: dark)': {
          'background-color': 'rgb(26 26 26)'
        }
      }
    ],
    [
      'text-surface',
      {
        'color': 'rgb(31 41 55)',
        '@media (prefers-color-scheme: dark)': {
          'color': 'rgb(249 250 251)'
        }
      }
    ]
  ]
});`;

	let cssVariables = `/* globals.css */
:root {
  /* Light theme */
  --color-primary: 124 58 237;
  --color-secondary: 245 158 11;
  --color-background: 255 255 255;
  --color-foreground: 31 41 55;
}

.dark {
  /* Dark theme */
  --color-primary: 139 92 246;
  --color-secondary: 251 191 36;
  --color-background: 17 24 39;
  --color-foreground: 249 250 251;
}

/* Use in components */
.custom-bg {
  background-color: rgb(var(--color-background));
  color: rgb(var(--color-foreground));
}`;

	let animations = `// uno.config.ts
export default defineConfig({
  theme: {
    animation: {
      'fade-in': 'fadeIn 0.3s ease-in-out',
      'slide-up': 'slideUp 0.3s ease-out',
      'bounce-soft': 'bounceSoft 0.6s ease-in-out'
    },
    
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      slideUp: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' }
      },
      bounceSoft: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' }
      }
    }
  }
});`;

	let responsiveCustom = `// uno.config.ts
export default defineConfig({
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'tablet': '768px',
      'desktop': '1024px'
    }
  }
});

// Usage in components
<div class="
  grid 
  grid-cols-1 
  xs:grid-cols-2 
  tablet:grid-cols-3 
  desktop:grid-cols-4
">
  <!-- Responsive grid -->
</div>`;

	let utilities = `// uno.config.ts
export default defineConfig({
  shortcuts: {
    // Composite utilities
    'btn-primary': 'px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors',
    'card-base': 'bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700',
    'text-balanced': 'text-pretty leading-relaxed',
    
    // Layout patterns
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'grid-auto-fit': 'grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'
  },
  
  rules: [
    // Custom utilities
    ['glass-effect', {
      'backdrop-filter': 'blur(10px)',
      'background-color': 'rgba(255, 255, 255, 0.1)',
      'border': '1px solid rgba(255, 255, 255, 0.2)'
    }],
    
    ['text-gradient', {
      'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'background-clip': 'text',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    }]
  ]
});`;
</script>

<Breadcrumb
	sections={[
		{ label: 'themes', path: '/themes' },
		{ label: 'customization', path: '/themes/customization' }
	]}
/>

<div class="max-w-4xl mx-auto space-y-6">
	<Typography el="h1">Theme Customization</Typography>
	<Typography el="p">
		Learn how to customize and extend the @cinderlink/ui-kit theme system to match your brand and
		design requirements.
	</Typography>

	<!-- Basic Customization -->
	<Card>
		<Typography el="h2" classes="mb-3">Basic Theme Customization</Typography>
		<Typography el="p" classes="mb-4">
			Customize colors, spacing, and typography through your UnoCSS configuration:
		</Typography>
		<CodeEditor bind:code={basicCustomization} language="javascript" readOnly />
	</Card>

	<!-- Custom Components -->
	<Card>
		<Typography el="h2" classes="mb-3">Creating Themed Components</Typography>
		<Typography el="p" classes="mb-4">
			Build custom components that integrate with your theme system:
		</Typography>
		<CodeEditor bind:code={componentTheme} language="svelte" readOnly />
	</Card>

	<!-- Advanced Dark Mode -->
	<Card>
		<Typography el="h2" classes="mb-3">Advanced Dark Mode</Typography>
		<Typography el="p" classes="mb-4">
			Create sophisticated dark mode experiences with custom color schemes:
		</Typography>
		<CodeEditor bind:code={darkModeCustom} language="javascript" readOnly />
	</Card>

	<!-- CSS Variables Approach -->
	<Card>
		<Typography el="h2" classes="mb-3">CSS Variables Approach</Typography>
		<Typography el="p" classes="mb-4">
			Use CSS custom properties for maximum flexibility and runtime theme switching:
		</Typography>
		<CodeEditor bind:code={cssVariables} language="css" readOnly />
	</Card>

	<!-- Custom Animations -->
	<Card>
		<Typography el="h2" classes="mb-3">Custom Animations</Typography>
		<Typography el="p" classes="mb-4">
			Add custom animations and transitions to enhance user experience:
		</Typography>
		<CodeEditor bind:code={animations} language="javascript" readOnly />
	</Card>

	<!-- Responsive Design -->
	<Card>
		<Typography el="h2" classes="mb-3">Responsive Customization</Typography>
		<Typography el="p" classes="mb-4">
			Define custom breakpoints and responsive utilities:
		</Typography>
		<CodeEditor bind:code={responsiveCustom} language="javascript" readOnly />
	</Card>

	<!-- Utility Classes -->
	<Card>
		<Typography el="h2" classes="mb-3">Custom Utilities</Typography>
		<Typography el="p" classes="mb-4">
			Create reusable utility classes and design patterns:
		</Typography>
		<CodeEditor bind:code={utilities} language="javascript" readOnly />
	</Card>

	<!-- Best Practices -->
	<Card>
		<Typography el="h2" classes="mb-3">Best Practices</Typography>
		<div class="space-y-4">
			<div>
				<Typography el="h4" classes="mb-2">Design Tokens</Typography>
				<Typography el="p">
					Define your design system as tokens (colors, spacing, typography) before implementing
					components.
				</Typography>
			</div>

			<div>
				<Typography el="h4" classes="mb-2">Consistent Naming</Typography>
				<Typography el="p">
					Use semantic names (primary, secondary, accent) rather than color names (blue, red) for
					better maintainability.
				</Typography>
			</div>

			<div>
				<Typography el="h4" classes="mb-2">Dark Mode First</Typography>
				<Typography el="p">
					Design for both light and dark modes from the beginning to ensure proper contrast and
					usability.
				</Typography>
			</div>

			<div>
				<Typography el="h4" classes="mb-2">Progressive Enhancement</Typography>
				<Typography el="p">
					Start with system defaults and progressively add custom styling to maintain accessibility.
				</Typography>
			</div>
		</div>
	</Card>

	<!-- Examples -->
	<Card>
		<Typography el="h2" classes="mb-3">Theme Examples</Typography>
		<Typography el="p" classes="mb-4">See different theme configurations in action:</Typography>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div
				class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg border"
			>
				<Typography el="h4" classes="mb-2">Corporate Theme</Typography>
				<Typography el="p" classes="mb-3">Professional blue and gray palette</Typography>
				<div class="flex gap-2">
					<div class="w-6 h-6 bg-blue-500 rounded"></div>
					<div class="w-6 h-6 bg-gray-500 rounded"></div>
					<div class="w-6 h-6 bg-blue-100 rounded"></div>
				</div>
			</div>

			<div
				class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-lg border"
			>
				<Typography el="h4" classes="mb-2">Nature Theme</Typography>
				<Typography el="p" classes="mb-3">Earth tones and green accents</Typography>
				<div class="flex gap-2">
					<div class="w-6 h-6 bg-emerald-500 rounded"></div>
					<div class="w-6 h-6 bg-amber-500 rounded"></div>
					<div class="w-6 h-6 bg-stone-500 rounded"></div>
				</div>
			</div>

			<div
				class="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 p-6 rounded-lg border"
			>
				<Typography el="h4" classes="mb-2">Creative Theme</Typography>
				<Typography el="p" classes="mb-3">Vibrant and playful colors</Typography>
				<div class="flex gap-2">
					<div class="w-6 h-6 bg-rose-500 rounded"></div>
					<div class="w-6 h-6 bg-violet-500 rounded"></div>
					<div class="w-6 h-6 bg-orange-500 rounded"></div>
				</div>
			</div>

			<div
				class="bg-gradient-to-br from-slate-50 to-zinc-50 dark:from-slate-900/20 dark:to-zinc-900/20 p-6 rounded-lg border"
			>
				<Typography el="h4" classes="mb-2">Minimal Theme</Typography>
				<Typography el="p" classes="mb-3">Clean monochrome design</Typography>
				<div class="flex gap-2">
					<div class="w-6 h-6 bg-slate-900 rounded"></div>
					<div class="w-6 h-6 bg-slate-500 rounded"></div>
					<div class="w-6 h-6 bg-slate-200 rounded"></div>
				</div>
			</div>
		</div>
	</Card>

	<!-- Resources -->
	<Card>
		<Typography el="h2" classes="mb-3">Additional Resources</Typography>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<Typography el="h4">Documentation</Typography>
				<ul class="space-y-1 text-sm">
					<li>
						• <a
							href="https://unocss.dev/config/theme"
							class="text-purple-600 hover:text-purple-800"
							target="_blank">UnoCSS Theme Config</a
						>
					</li>
					<li>
						• <a
							href="https://unocss.dev/presets/uno"
							class="text-purple-600 hover:text-purple-800"
							target="_blank">UnoCSS Presets</a
						>
					</li>
					<li>
						• <a href="/themes/overview" class="text-purple-600 hover:text-purple-800"
							>Theme Overview</a
						>
					</li>
				</ul>
			</div>

			<div class="space-y-2">
				<Typography el="h4">Tools</Typography>
				<ul class="space-y-1 text-sm">
					<li>
						• <a
							href="https://tailwindcss.com/docs/customizing-colors"
							class="text-purple-600 hover:text-purple-800"
							target="_blank">Color Palette Generator</a
						>
					</li>
					<li>
						• <a
							href="https://www.figma.com"
							class="text-purple-600 hover:text-purple-800"
							target="_blank">Design System Tools</a
						>
					</li>
					<li>
						• <a href="/guides/examples" class="text-purple-600 hover:text-purple-800"
							>Live Examples</a
						>
					</li>
				</ul>
			</div>
		</div>
	</Card>
</div>
