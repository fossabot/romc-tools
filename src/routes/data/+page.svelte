<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';
	import { table_lookup, type TableName } from '$lib/data';
	import { cn } from '$lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let table = $state(data.table);
	const table_data = $derived(
		table !== undefined ? table_lookup[table]().then(({ get_table }) => get_table()) : undefined
	);
</script>

<div class="mt-8 mb-6 flex justify-center">
	<Select.Root
		type="single"
		value={table}
		onValueChange={(newValue) => {
			table = newValue as TableName;

			const params = new URLSearchParams(page.url.searchParams);
			params.set('table', table);
			replaceState(`?${params.toString()}`, { table });
		}}
	>
		<Select.Trigger class="w-48">{table ?? 'Select a table'}</Select.Trigger>
		<Select.Content>
			{#each Object.keys(table_lookup) as name}
				<Select.Item value={name}>{name}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>

<Table.Root>
	{#if table_data === undefined}
		<Table.Caption>No data.</Table.Caption>
	{:else}
		{#await table_data}
			<Table.Caption>Loading data...</Table.Caption>
		{:then { caption, rows: [headers, ...rows] }}
			<Table.Caption>{caption}</Table.Caption>
			<Table.Header>
				<Table.Row>
					{#each headers as head, idx}
						<Table.Head class={cn(idx > 0 && 'text-end')}>{head}</Table.Head>
					{/each}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each rows as row}
					<Table.Row>
						{#each row as cell, idx}
							<Table.Cell class={idx > 0 ? 'text-end' : 'font-medium'}>{cell}</Table.Cell>
						{/each}
					</Table.Row>
				{/each}
			</Table.Body>
		{/await}
	{/if}
</Table.Root>
