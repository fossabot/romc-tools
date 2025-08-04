<script lang="ts">
	import { base } from '$app/paths';

	import { Button } from '$lib/components/ui/button';
	import { get_route_id, routes } from '$lib/routes';
</script>

<div class="my-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
	{#each routes as { path, title, Icon }}
		{@const transition_name = get_route_id({ title })}

		<Button href="{base}{path}" class="flex h-24 flex-col sm:h-32 sm:text-lg" variant="outline">
			<Icon class="size-6 sm:size-10" style="view-transition-name: {transition_name}-icon" />
			<span style:view-transition-name={transition_name}>{title}</span>
		</Button>
	{/each}
</div>
