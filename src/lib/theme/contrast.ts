/**
 * Contrast utilities for adapting glass effects to different backgrounds
 */

/**
 * Calculate the relative luminance of a color
 * @param r Red value (0-255)
 * @param g Green value (0-255)
 * @param b Blue value (0-255)
 * @returns Relative luminance (0-1)
 */
export function getLuminance(r: number, g: number, b: number): number {
	// Convert to 0-1 range
	const rsRGB = r / 255;
	const gsRGB = g / 255;
	const bsRGB = b / 255;

	// Apply gamma correction
	const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
	const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
	const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

	// Calculate relative luminance
	return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors
 * @param luminance1 Luminance of first color
 * @param luminance2 Luminance of second color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(luminance1: number, luminance2: number): number {
	const lighter = Math.max(luminance1, luminance2);
	const darker = Math.min(luminance1, luminance2);
	return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Parse a color string to RGB values
 * @param color Color string (hex, rgb, rgba)
 * @returns RGB values or null if invalid
 */
export function parseColor(color: string): { r: number; g: number; b: number } | null {
	// Hex color
	const hexMatch = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
	if (hexMatch) {
		const hex = hexMatch[1];
		if (hex.length === 3) {
			return {
				r: parseInt(hex[0] + hex[0], 16),
				g: parseInt(hex[1] + hex[1], 16),
				b: parseInt(hex[2] + hex[2], 16)
			};
		} else {
			return {
				r: parseInt(hex.substr(0, 2), 16),
				g: parseInt(hex.substr(2, 2), 16),
				b: parseInt(hex.substr(4, 2), 16)
			};
		}
	}

	// RGB/RGBA color
	const rgbMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
	if (rgbMatch) {
		return {
			r: parseInt(rgbMatch[1]),
			g: parseInt(rgbMatch[2]),
			b: parseInt(rgbMatch[3])
		};
	}

	return null;
}

/**
 * Get the average color of an image element
 * @param img Image element
 * @returns Average RGB color
 */
export function getAverageImageColor(img: HTMLImageElement): { r: number; g: number; b: number } {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (!ctx) return { r: 128, g: 128, b: 128 };

	canvas.width = 32; // Small size for performance
	canvas.height = 32;
	ctx.drawImage(img, 0, 0, 32, 32);

	const imageData = ctx.getImageData(0, 0, 32, 32);
	const data = imageData.data;
	let r = 0,
		g = 0,
		b = 0;

	for (let i = 0; i < data.length; i += 4) {
		r += data[i];
		g += data[i + 1];
		b += data[i + 2];
	}

	const pixelCount = data.length / 4;
	return {
		r: Math.round(r / pixelCount),
		g: Math.round(g / pixelCount),
		b: Math.round(b / pixelCount)
	};
}

/**
 * Determine if a background is light or dark
 * @param luminance Background luminance
 * @returns 'light' or 'dark'
 */
export function getBackgroundType(luminance: number): 'light' | 'dark' {
	return luminance > 0.5 ? 'light' : 'dark';
}

/**
 * Get recommended glass style based on background
 * @param backgroundLuminance Luminance of the background
 * @returns Recommended variant and opacity adjustments
 */
export function getGlassRecommendations(backgroundLuminance: number): {
	variant: 'glass' | 'frosted' | 'surface';
	opacityMultiplier: number;
	borderOpacity: number;
	shadowIntensity: number;
} {
	// Very dark backgrounds (0-0.1)
	if (backgroundLuminance < 0.1) {
		return {
			variant: 'frosted',
			opacityMultiplier: 1.5,
			borderOpacity: 0.3,
			shadowIntensity: 0.8
		};
	}

	// Dark backgrounds (0.1-0.3)
	if (backgroundLuminance < 0.3) {
		return {
			variant: 'glass',
			opacityMultiplier: 1.2,
			borderOpacity: 0.2,
			shadowIntensity: 0.6
		};
	}

	// Medium backgrounds (0.3-0.7)
	if (backgroundLuminance < 0.7) {
		return {
			variant: 'glass',
			opacityMultiplier: 1.0,
			borderOpacity: 0.15,
			shadowIntensity: 0.4
		};
	}

	// Light backgrounds (0.7-0.9)
	if (backgroundLuminance < 0.9) {
		return {
			variant: 'glass',
			opacityMultiplier: 0.8,
			borderOpacity: 0.1,
			shadowIntensity: 0.3
		};
	}

	// Very light backgrounds (0.9-1.0)
	return {
		variant: 'surface',
		opacityMultiplier: 0.6,
		borderOpacity: 0.08,
		shadowIntensity: 0.2
	};
}

/**
 * Generate CSS custom properties for contrast-aware glass effects
 * @param backgroundLuminance Luminance of the background
 * @returns CSS custom properties object
 */
export function generateContrastVariables(backgroundLuminance: number): Record<string, string> {
	const recommendations = getGlassRecommendations(backgroundLuminance);
	const isDark = getBackgroundType(backgroundLuminance) === 'dark';

	return {
		'--glass-bg-opacity': String(0.1 * recommendations.opacityMultiplier),
		'--glass-border-opacity': String(recommendations.borderOpacity),
		'--glass-shadow-opacity': String(recommendations.shadowIntensity),
		'--glass-text-color': isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
		'--glass-highlight-opacity': isDark ? '0.1' : '0.3'
	};
}
