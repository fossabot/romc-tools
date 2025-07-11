<script lang="ts">
	import type { RefineRange } from '$lib/calc/safe-refine';
	import { calculate } from '$lib/calc/safe-refine';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Slider } from '$lib/components/ui/slider';

	let refine_range: [RefineRange, RefineRange] = $state([0, 1]);
	const [refine_from, refine_to] = $derived(refine_range);

	const output = $derived.by(() => {
		const { zeny, copy, material } = calculate(refine_from, refine_to);

		return {
			zeny: `${zeny.toLocaleString()}z`,
			equipment: `${copy} copies`,
			material: `${material} oridecon/elunium/mithril`,
		};
	});
</script>

<h1>Safe refine Calculator</h1>

<Separator class="my-2" />

<div class="mt-6 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
	<div class="flex flex-col space-y-2 sm:col-span-2">
		<Label for="refine_range">Refine range</Label>

		<input type="hidden" id="refine_range" value="{refine_from}-{refine_to}" />
		<Slider type="multiple" bind:value={refine_range} max={15} thumbPositioning="contain" />
	</div>
</div>

<h2>You're going to need...</h2>

<Separator class="my-2" />

<p>Zeny: <span class="font-semibold underline">{output.zeny}</span></p>
<p>Equipment: <span class="font-semibold underline">{output.equipment}</span></p>
<p>Material: <span class="font-semibold underline">{output.material}</span></p>
