<script>
	import { base } from '$app/paths';
	import { page } from '$app/state';

	import * as Tooltip from '$lib/components/ui/tooltip';
	import { SOURCE_CODE_URL, VERSION } from '$lib/constants';
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
	{#if page.data.data_id !== undefined}
		<a
			href="{base}/data?table={page.data.data_id}"
			class="underline"
			style:view-transition-name="nav-data">View data</a
		>
	{/if}

	<p class="flex-1 text-end">romc-tools @ {@render source_code_link()}</p>
</footer>
