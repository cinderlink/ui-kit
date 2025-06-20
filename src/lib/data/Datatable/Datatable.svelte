<script lang="ts">
	import { type SchemaObject, default as Ajv } from 'ajv';
	interface Props {
		data: Record<string, unknown>[];
		schema: SchemaObject;
		columns?: {
			id: string;
			label?: string;
			width?: string;
			component?: any; // Component constructor type
			props?: Record<string, unknown>;
			transform?: (value: unknown) => unknown;
		}[];
	}

	let {
		data,
		schema,
		columns = Object.keys(schema.properties).map((key) => ({
			id: key
		}))
	}: Props = $props();

	// Validation function (currently unused)
	// const validate = (value: unknown, schema: SchemaObject) => {
	// 	const ajv = new Ajv();
	// 	const validate = ajv.compile(schema);
	// 	const valid = validate(value);
	// 	if (!valid) {
	// 		console.error(validate.errors);
	// 	}
	// 	return valid;
	// };

	let columnString = $state('');
	let defaultWidthPct = $state(0);

	$effect(() => {
		defaultWidthPct = 100 / columns.length;
	});
	$effect(() => {
		columnString = columns
			.map((c) => `minmax(150px, ${c.width ? c.width : `${Math.ceil(defaultWidthPct)}%`})`)
			.join(' ');
	});
</script>

<div class="datatable" style="grid-template-columns: {columnString};">
	<div class="datatable__header">
		<div class="datatable__row">
			{#each columns as column}
				<div class="datatable__header-cell">
					<span class="datatable__header-label">
						{column.label || column.id}
					</span>
				</div>
			{/each}
		</div>
	</div>
	{#each data as row}
		<div class="datatable__body">
			<div class="datatable__row">
				{#each columns as column}
					<div class="datatable__cell">
						{#if column.component}
							<column.component record={row} {...column.props || {}} on:refresh />
						{:else}
							{column.transform
								? column.transform(row[column.id])
								: row[column.id] || '(undefined)'}
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.datatable {
		@apply grid border-collapse min-w-full;
	}
	.datatable .datatable__header,
	.datatable .datatable__body,
	.datatable .datatable__row {
		display: contents;
	}
	.datatable__header-cell {
		@apply relative;
		@apply flex items-center justify-between;
		@apply text-sm font-medium text-purple-800;
		@apply bg-purple-200;
		@apply dark-(text-purple-200 bg-purple-800);
	}
	.datatable__header-label {
		@apply px-2 py-1 overflow-hidden;
	}
	.datatable__cell {
		@apply whitespace-nowrap;
		@apply px-2 py-1 overflow-scroll;
		@apply text-sm text-purple-800;
		@apply border-2 border-purple-200 rounded-md;
		@apply dark-(text-purple-200 border-purple-800);
	}
</style>
