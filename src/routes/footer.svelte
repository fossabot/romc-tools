<script>
	import { base } from '$app/paths';
	import { page } from '$app/state';

	import * as Tooltip from '$lib/components/ui/tooltip';
	import { SOURCE_CODE_URL, VERSION } from '$lib/constants';
	import { get_route_icon, get_route_id } from '$lib/routes';
</script>

{#snippet source_code_link()}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<a href={SOURCE_CODE_URL} target="_blank" rel="noopener noreferrer" class="underline"
					>{VERSION}</a
				>
			</Tooltip.Trigger>
			<Tooltip.Content>View source code</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/snippet}

<footer class="flex items-center justify-between border-t px-8 py-6 text-sm font-medium sm:py-4">
	{#if page.data.table_id !== undefined}
		{@const title = 'View data'}
		{@const transition_name = get_route_id({ title })}
		{@const Icon = get_route_icon({ title })}

		{@const table_id =
			page.data.table_id === 'override' ? page.state.table_id_override : page.data.table_id}

		<a href="{base}/data?table={table_id}" class="flex items-center gap-2">
			<Icon class="size-4" style="view-transition-name: {transition_name}-icon" />
			<span class="underline" style:view-transition-name={transition_name}>{title}</span>
		</a>
	{/if}

	<p class="flex-1 text-end">romc-tools @ {@render source_code_link()}</p>
</footer>
