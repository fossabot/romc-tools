<script lang="ts">
	import type { RefineRange } from '$lib/calc/safe-refine';
	import { calculate } from '$lib/calc/safe-refine';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Slider } from '$lib/components/ui/slider';

	let equipment_price = $state(0);
	let refine_range: [RefineRange, RefineRange] = $state([0, 1]);
	const [refine_from, refine_to] = $derived(refine_range);

	const output = $derived.by((): [string, string][] => {
		const { zeny, copy, material } = calculate(refine_from, refine_to);
		const copy_in_zeny = copy * equipment_price;
		const material_in_zeny = material * 25_000;
		const total = zeny + copy_in_zeny + material_in_zeny;

		return [
			['Zeny', `${zeny.toLocaleString()}z`],
			['Equipment', `${copy} copies / ${copy_in_zeny.toLocaleString()}z`],
			['Material', `${material} items / ${material_in_zeny.toLocaleString()}z`],
			['Total zeny', `${total.toLocaleString()}z`],
		];
	});
</script>

<h1>Safe refine Calculator</h1>

<Separator class="my-2" />

<div class="mt-6 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
	<div class="flex flex-col space-y-2">
		<Label for="equipment_price">Equipment price</Label>
		<Input type="number" bind:value={equipment_price} id="equipment_price" min="0" step="1000" />
	</div>

	<div class="flex flex-col space-y-2 sm:col-span-2">
		<Label for="refine_range">Refine range</Label>

		<input type="hidden" id="refine_range" value="{refine_from}-{refine_to}" />
		<Slider type="multiple" bind:value={refine_range} max={15} thumbPositioning="contain" />
	</div>
</div>

<h2>You're going to need...</h2>

<Separator class="my-2" />

<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
	{#each output as [key, value]}
		<div class="flex flex-col -space-y-1 text-center sm:text-end">
			<span class="text-sm font-medium">{key}</span>
			<span class="col-span-3 text-lg font-semibold underline">{value}</span>
		</div>
	{/each}
</div>
