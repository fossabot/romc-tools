<script lang="ts">
	import { Plus, Minus } from '@lucide/svelte';
	import { untrack } from 'svelte';

	import {
		get_max_stat_possible,
		get_next_stat_cost,
		get_total_stat_cost,
		stat_names,
	} from '$lib/calc/stat-simulator';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Popover from '$lib/components/ui/popover';
	import { Separator } from '$lib/components/ui/separator';
	import { Slider } from '$lib/components/ui/slider';
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
		<p class="flex-1">Remaining points: <span class="underline">{remaining_points}</span></p>
		<Button variant="destructive" size="sm" class="w-20" onclick={parameters.reset}>Reset</Button>
	</div>

	<ul class="grid gap-x-8 gap-y-2 sm:grid-cols-2">
		{#each stat_names as stat}
			{@const increment = () => (parameters.current.allocations[stat] += 1)}
			{@const decrement = () => (parameters.current.allocations[stat] -= 1)}
			{@const current_stat = allocations[stat]}
			{@const next_stat_cost = get_next_stat_cost(current_stat)}
			{@const max_stat_possible = get_max_stat_possible(current_stat, remaining_points, max_stat)}

			<li class="flex items-center space-x-2">
				<Popover.Root>
					<Popover.Trigger
						class={buttonVariants({
							variant: 'outline',
							class: 'inline-flex flex-1 font-medium select-none',
						})}
					>
						<span class="flex-1">{stat} +{current_stat}</span>
						<Separator orientation="vertical" class="mx-2" />
						<span>{next_stat_cost}</span>
					</Popover.Trigger>
					<Popover.Content>
						<Label for="allocated_{stat}">Set {stat} value</Label>
						<div class="flex items-center space-x-2">
							<Slider
								type="single"
								id="allocated_{stat}"
								showTicks={false}
								max={max_stat_possible}
								bind:value={parameters.current.allocations[stat]}
								disabled={remaining_points < 0}
							/>
							<span>{max_stat_possible}</span>
						</div>
					</Popover.Content>
				</Popover.Root>

				<Button size="icon" disabled={current_stat >= max_stat_possible} onclick={increment}>
					<Plus />
					<span class="sr-only">Increment {stat}</span>
				</Button>

				<Button size="icon" disabled={current_stat <= 0} onclick={decrement}>
					<Minus />
					<span class="sr-only">Decrement {stat}</span>
				</Button>
			</li>
		{/each}
	</ul>
</div>
