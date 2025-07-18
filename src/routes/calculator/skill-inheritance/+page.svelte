<script lang="ts">
	import {
		calculate_skill_inheritance_shard,
		InheritanceQuality,
	} from '$lib/calc/skill-inheritance';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Slider } from '$lib/components/ui/slider';
	import { formatZeny } from '$lib/utils';
	import { parameters } from './parameters.svelte';

	const { quality, level } = $derived(parameters.current);

	const shard_cost = $derived(calculate_skill_inheritance_shard(quality, level));
	const zeny_cost = $derived(formatZeny(shard_cost * 1_200_000));
</script>

<div class="mt-6 mb-8 flex flex-col space-y-4">
	<div class="flex flex-col items-center space-y-2">
		<Label for="inheritance_quality">Inheritance skill quality</Label>
		<Select.Root type="single" bind:value={parameters.current.quality}>
			<Select.Trigger id="inheritance_quality" class="w-48">{quality}</Select.Trigger>
			<Select.Content>
				{#each Object.values(InheritanceQuality) as value}
					<Select.Item {value}>{value}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="flex flex-col space-y-2">
		<div class="flex items-end">
			<Label for="inheritance_level" class="flex-1">Inheritance level</Label>
			<p class="flex-col items-end font-medium underline max-sm:flex max-sm:-space-y-1">
				<span>{shard_cost} shards /</span>
				<span>{zeny_cost}</span>
			</p>
		</div>

		<Slider type="multiple" id="inheritance_level" bind:value={parameters.current.level} max={10} />
	</div>
</div>
