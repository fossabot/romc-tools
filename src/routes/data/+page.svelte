<script lang="ts">
	import { onMount } from 'svelte';

	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';

	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Switch } from '$lib/components/ui/switch';
	import * as Table from '$lib/components/ui/table';
	import { tables, type TableName } from '$lib/tables';
	import { cn, transpose } from '$lib/utils';

	let table = $state<TableName>();
	let transpose_table = $state(false);
	const table_data = $derived(table !== undefined ? tables[table]() : undefined);

	onMount(() => {
		const _table = page.url.searchParams.get('table') ?? '';
		if (_table in tables) table = _table as TableName;
	});
</script>

<div class="mt-8 mb-6 flex justify-center space-x-4">
	<Select.Root
		type="single"
		value={table}
		onValueChange={(newValue) => {
			table = newValue as TableName;

			const params = new URLSearchParams(page.url.searchParams);
			params.set('table', table);
			replaceState(`?${params.toString()}`, {});
		}}
	>
		<Select.Trigger class="w-36">{table ?? 'Select a table'}</Select.Trigger>
		<Select.Content>
			{#each Object.keys(tables) as name}
				<Select.Item value={name}>{name}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<div class="flex items-center space-x-2">
		<Switch id="transpose_table" bind:checked={transpose_table} />
		<Label for="transpose_table">Transpose</Label>
	</div>
</div>

<Table.Root>
	{#if table_data === undefined}
		<Table.Caption>No data.</Table.Caption>
	{:else}
		{#await table_data}
			<Table.Caption>Loading data...</Table.Caption>
		{:then { caption, rows: _rows }}
			{@const [headers, ...rows] = transpose_table ? transpose(_rows) : _rows}
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
