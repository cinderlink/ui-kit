export const theme = $state({
	darkMode:
		(typeof window !== 'undefined' && window?.sessionStorage?.getItem('darkMode') === 'true') ||
		false
});

export function initTheme() {
	// This should be called from within a component
	$effect(() => {
		if (typeof window !== 'undefined') {
			window.sessionStorage.setItem('darkMode', theme.darkMode.toString());
		}
	});
}

export default theme;
