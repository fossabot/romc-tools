<script lang="ts">
	import { untrack } from 'svelte';

	import { get_total_stat_cost, stat_names } from '$lib/calc/stat-simulator';
	import StatAllocator from '$lib/components/stat-allocator.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { sum } from '$lib/utils';

	import { parameters } from './parameters.svelte';

	const { allocations, available_points, max_stat } = $derived(parameters.current);
	const used_points = $derived(sum(Object.values(allocations).map(get_total_stat_cost)));
	const remaining_points = $derived(available_points - used_points);

	$effect(() => {
		for (const stat of stat_names) {
			const allocated = untrack(() => allocations[stat]);
			allocations[stat] = Math.min(allocated, max_stat);
		}
	});
</script>

<div class="mt-4 mb-6 flex space-x-4">
	<div class="flex flex-1 flex-col space-y-2">
		<Label for="available_points">Available points</Label>
		<Input
			type="number"
			id="available_points"
			value={available_points}
			onchange={(e) =>
				(parameters.current.available_points = Math.max(
					used_points,
					Number((e.target as HTMLInputElement).value)
				))}
			min="0"
		/>
	</div>

	<div class="flex flex-1 flex-col space-y-2">
		<Label for="max_stat">Max stat</Label>
		<Input
			type="number"
			id="max_stat"
			value={max_stat}
			onchange={(e) =>
				(parameters.current.max_stat = Math.max(0, Number((e.target as HTMLInputElement).value)))}
			min="0"
		/>
	</div>
</div>

<Separator class="my-4" />

<div class="flex flex-col space-y-2 sm:flex-col-reverse sm:space-y-reverse">
	<div class="flex items-center text-sm font-medium">
		<p class="flex flex-1 flex-col">
			<span>Used points: <span class="underline">{used_points}</span></span>
			<span>Remaining points: <span class="underline">{remaining_points}</span></span>
		</p>
		<Button variant="destructive" size="sm" class="w-20" onclick={parameters.reset}>Reset</Button>
	</div>

	<ul class="grid gap-y-2">
		{#each stat_names as stat_name}
			<li class="contents">
				<StatAllocator
					bind:allocated_stat={parameters.current.allocations[stat_name]}
					{stat_name}
					{max_stat}
					{remaining_points}
				/>
			</li>
		{/each}
	</ul>
</div>
