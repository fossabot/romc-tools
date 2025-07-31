<script lang="ts">
	import { calculate_master_skill_cost, costs, MasterSkill } from '$lib/calc/master-skill';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Slider } from '$lib/components/ui/slider';
	import { formatZeny, sum } from '$lib/utils';

	import { parameters } from './parameters.svelte';

	const { levels } = $derived(parameters.current);

	const cost = $derived(calculate_master_skill_cost(levels));
	const total_cost = $derived(sum(Object.values(cost)));
</script>

<div class="mt-4 mb-8 flex flex-col space-y-4">
	{#each Object.entries(MasterSkill) as [key, name]}
		{@const zeny_cost = formatZeny(cost[name])}
		<div class="flex flex-col space-y-2">
			<div class="flex items-center">
				<Label for="{key}_range" class="flex-1">{name}</Label>
				<span class="font-medium underline">{zeny_cost}</span>
			</div>

			<Slider
				type="multiple"
				id="{key}_range"
				bind:value={parameters.current.levels[name]}
				max={costs[name].length}
			/>
		</div>
	{/each}
</div>

<Separator class="my-4" />

<div class="-space-y-1 text-center sm:text-end">
	<p class="text-sm font-medium">Total cost</p>
	<p class="text-lg font-semibold underline">{formatZeny(total_cost)}</p>
</div>
