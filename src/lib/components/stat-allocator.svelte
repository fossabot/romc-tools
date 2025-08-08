<script lang="ts">
	import { ChevronsRight, Plus, Minus } from '@lucide/svelte';

	import {
		get_max_stat_possible,
		get_next_stat_cost,
		type StatName,
	} from '$lib/calc/stat-simulator';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import * as Popover from '$lib/components/ui/popover';
	import { Separator } from '$lib/components/ui/separator';
	import { Slider } from '$lib/components/ui/slider';

	interface Props {
		stat_name: StatName;
		allocated_stat: number;
		remaining_points: number;
		max_stat: number;
	}

	let { stat_name, allocated_stat = $bindable(), remaining_points, max_stat }: Props = $props();

	const next_stat_cost = get_next_stat_cost(allocated_stat);
	const max_stat_possible = get_max_stat_possible(allocated_stat, remaining_points, max_stat);

	const increment = () => (allocated_stat += 1);
	const decrement = () => (allocated_stat -= 1);
	const max_out = () => (allocated_stat = max_stat_possible);
</script>

<div class="flex items-center space-x-2">
	<Popover.Root>
		<Popover.Trigger
			class={buttonVariants({
				variant: 'outline',
				class: 'inline-flex flex-1 font-medium select-none',
			})}
		>
			<span class="flex-1">{stat_name} +{allocated_stat}</span>
			<Separator orientation="vertical" class="mx-2" />
			<span class="w-4">{next_stat_cost}</span>
		</Popover.Trigger>
		<Popover.Content>
			<Label for="allocated_{stat_name}">Set {stat_name} value</Label>
			<div class="flex items-center space-x-2">
				<Slider
					type="single"
					id="allocated_{stat_name}"
					showTicks={false}
					max={max_stat_possible}
					bind:value={allocated_stat}
					disabled={remaining_points < 0}
				/>
				<span class="text-sm font-medium">{max_stat_possible}</span>
			</div>
		</Popover.Content>
	</Popover.Root>

	<Button size="icon" disabled={allocated_stat <= 0} onclick={decrement}>
		<Minus />
		<span class="sr-only">Decrement {stat_name}</span>
	</Button>

	<Button size="icon" disabled={allocated_stat >= max_stat_possible} onclick={increment}>
		<Plus />
		<span class="sr-only">Increment {stat_name}</span>
	</Button>

	<Button size="icon" disabled={allocated_stat >= max_stat_possible} onclick={max_out}>
		<ChevronsRight />
		<span class="sr-only">Max out {stat_name}</span>
	</Button>
</div>
