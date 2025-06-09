export const theme = $state({
	darkMode:
		(typeof window !== 'undefined' && window?.sessionStorage?.getItem('darkMode') === 'true') ||
		false
});

if (typeof window !== 'undefined') {
	$effect(() => {
		window?.sessionStorage?.setItem('darkMode', theme.darkMode.toString());
	});
}

export default theme;
