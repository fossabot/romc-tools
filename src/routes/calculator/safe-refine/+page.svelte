<script lang="ts">
	import type { RefineRange } from '$lib/calc/safe-refine';
	import { calculate } from '$lib/calc/safe-refine';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';

	let refine_from: RefineRange = $state(0);
	let refine_to: RefineRange = $state(1);

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
	<div class="flex flex-col space-y-2">
		<Label for="refine_from">Refine from</Label>
		<Input bind:value={refine_from} id="refine_from" type="number" min="0" max={refine_to - 1} />
	</div>

	<div class="flex flex-col space-y-2">
		<Label for="refine_to">Refine to</Label>
		<Input bind:value={refine_to} id="refine_to" type="number" min={refine_from + 1} max="15" />
	</div>
</div>

<h2>You're going to need...</h2>

<Separator class="my-2" />

<p>Zeny: <span class="font-semibold underline">{output.zeny}</span></p>
<p>Equipment: <span class="font-semibold underline">{output.equipment}</span></p>
<p>Material: <span class="font-semibold underline">{output.material}</span></p>
