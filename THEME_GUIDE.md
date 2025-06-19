# Cinderlink UI Kit - Theme Guide

## Overview

The Cinderlink UI Kit uses a sophisticated glass morphism design system built on CSS variables and UnoCSS. This guide covers theming, customization, and the glass design system implementation.

## Glass Design System

### Core Principles

The UI Kit implements a **liquid glass** aesthetic with:
- **Translucent surfaces** with variable opacity
- **Backdrop blur effects** for depth and layering
- **Subtle gradients** and color transitions
- **Dynamic lighting** that responds to user interactions
- **Consistent depth hierarchy** through shadow systems

### CSS Variables

#### Glass Effects
```css
/* Light mode */
--glass-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
--glass-bg-surface: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1));
--glass-bg-frosted: linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));

/* Dark mode */
--glass-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
--glass-bg-surface: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
--glass-bg-frosted: linear-gradient(to bottom right, rgba(10, 10, 15, 0.95), rgba(10, 10, 15, 0.85));
```

#### Blur and Saturation
```css
--glass-blur: 12px;
--glass-blur-light: 8px;
--glass-blur-heavy: 20px;
--glass-saturation: 1.8;
```

#### Borders and Shadows
```css
--glass-border: 1px solid rgba(255, 255, 255, 0.15);
--glass-border-light: 1px solid rgba(255, 255, 255, 0.1);
--glass-shadow: 0 4px 32px rgba(147, 51, 234, 0.15);
--glass-shadow-hover: 0 8px 64px rgba(147, 51, 234, 0.25);
```

### Component Glass Levels

1. **Level 1 (Background)**: Subtle transparency for page backgrounds
2. **Level 2 (Surface)**: Card and panel backgrounds with medium blur
3. **Level 3 (Frosted)**: Sidebar and modal overlays with heavy blur
4. **Level 4 (Interactive)**: Buttons and controls with enhanced effects

## Dark Mode Implementation

### Theme Switching

The UI Kit uses a class-based dark mode strategy:
- Light mode: No class on `<html>`
- Dark mode: `.dark` class on `<html>`

### CSS Variable Strategy

All theme-aware properties use CSS variables that automatically switch:

```css
/* Component styling */
.my-component {
  background: var(--glass-bg-surface);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border: var(--glass-border);
  color: var(--text-primary);
}
```

### Color Palette

#### Primary Colors
- **Purple**: `#9333ea` (light) / `#a855f7` (dark)
- **Green**: `#10b981` (light) / `#34d399` (dark)
- **Pink**: `#ec4899` (light) / `#f472b6` (dark)
- **Yellow**: `#f59e0b` (light) / `#fbbf24` (dark)
- **Blue**: `#3b82f6` (light) / `#60a5fa` (dark)

#### Semantic Colors
```css
--text-primary: #111827; /* light */ / #f9fafb; /* dark */
--text-secondary: #6b7280; /* light */ / #9ca3af; /* dark */
--bg-primary: #ffffff; /* light */ / #0a0a0f; /* dark */
--bg-secondary: #f9fafb; /* light */ / #1f2937; /* dark */
```

## Component Theming

### Panel Components
```svelte
<div class="glass-panel">
  <!-- Content -->
</div>

<style>
.glass-panel {
  background: var(--glass-bg-surface);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border: var(--glass-border);
  border-radius: 1rem;
  box-shadow: var(--glass-shadow);
  transition: var(--glass-transition);
}

.glass-panel:hover {
  box-shadow: var(--glass-shadow-hover);
  border-color: rgba(147, 51, 234, 0.3);
}
</style>
```

### Interactive Elements
```svelte
<button class="glass-button">
  Click me
</button>

<style>
.glass-button {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
  border: var(--glass-border-light);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.glass-button:hover {
  background: var(--glass-bg-surface);
  box-shadow: var(--glass-shadow);
  transform: translateY(-1px);
}
</style>
```

## Customization

### Override CSS Variables

Create a custom theme by overriding the CSS variables:

```css
:root {
  /* Custom glass colors */
  --glass-bg: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05));
  --glass-shadow: 0 4px 32px rgba(59, 130, 246, 0.2);
  
  /* Custom brand colors */
  --brand-primary: #3b82f6;
  --brand-secondary: #1e40af;
}
```

### UnoCSS Integration

The theme system integrates with UnoCSS for utility classes:

```html
<!-- Glass effect utilities -->
<div class="glass-bg glass-border glass-shadow">
  Glass panel with utilities
</div>

<!-- Theme-aware colors -->
<div class="bg-glass-surface text-primary border-glass">
  Themed content
</div>
```

### Component Variants

Components support theme variants:

```svelte
<Card variant="glass" />
<Card variant="solid" />
<Card variant="outlined" />

<Button variant="glass" />
<Button variant="filled" />
<Button variant="outlined" />
```

## Animation and Transitions

### Glass Transitions
```css
--glass-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--glass-transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--glass-transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover Effects
```css
.glass-interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow-hover);
  backdrop-filter: blur(var(--glass-blur-heavy)) saturate(var(--glass-saturation));
}
```

## Best Practices

### 1. Layering
- Use different glass levels for visual hierarchy
- Avoid too many competing glass effects
- Consider backdrop content when choosing opacity

### 2. Performance
- Use `transform` for animations instead of changing blur values
- Limit backdrop-filter usage on mobile devices
- Test performance with many glass elements

### 3. Accessibility
- Ensure sufficient contrast ratios
- Provide fallbacks for reduced motion preferences
- Test with high contrast mode

### 4. Consistency
- Use predefined CSS variables
- Follow the established glass hierarchy
- Maintain consistent border radius and spacing

## Migration Guide

### From Legacy Themes
1. Replace hardcoded colors with CSS variables
2. Update component styles to use glass system
3. Test dark mode functionality
4. Verify accessibility compliance

### Component Updates
```svelte
<!-- Before -->
<div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);">

<!-- After -->
<div class="glass-surface">
```

## Troubleshooting

### Common Issues
1. **Glass not visible**: Check backdrop content and opacity values
2. **Dark mode not working**: Verify `.dark` class on `<html>`
3. **Performance issues**: Reduce blur values or number of glass elements
4. **Browser support**: Provide fallbacks for older browsers

### Debug Tools
- Use browser dev tools to inspect CSS variables
- Test with different backdrop content
- Verify color contrast ratios
- Check for CSS variable inheritance