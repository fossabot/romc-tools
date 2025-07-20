<script>
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

<footer class="flex justify-center border-t px-8 py-6 sm:justify-end sm:py-4">
	<p class="text-sm font-medium">romc-tools @ {@render source_code_link()}</p>
</footer>
