<script lang="ts">
	import { calculate_master_skill_cost, costs, MasterSkill } from '$lib/calc/master-skill';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Slider } from '$lib/components/ui/slider';
	import { sum } from '$lib/utils';
	import { parameters } from './parameters.svelte';

	const { levels } = $derived(parameters.current);

	const cost = $derived(calculate_master_skill_cost(levels));
	const total_cost = $derived(sum(Object.values(cost)));
</script>

<div class="my-4 flex flex-col space-y-4">
	{#each Object.entries(MasterSkill) as [key, name]}
		<div class="flex flex-col space-y-2">
			<div class="flex items-center">
				<Label for="{key}_range" class="flex-1">{name}</Label>
				<span class="font-medium underline">{cost[name].toLocaleString()}z</span>
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

<p class="text-end text-xl font-medium">
	Total cost: <span class="underline">{total_cost.toLocaleString()}z</span>
</p>
