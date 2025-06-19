<script lang="ts" module>
	import type { GroupDef } from '$lib/ddl/groups';
	import Typography from '$lib/content/Typography/Typography.svelte';
	export const group: GroupDef = {
		id: 'markup',
		label: 'Markup',
		description: 'Code, markdown, and syntax highlighting components'
	};
</script>

<Typography>{group.label}</Typography>
<Typography el="p">{group.description}</Typography>
