<script lang="ts">
	import { calculate_equipment_price, EquipmentState } from '$lib/calc/safe-refine';
	import { calculate_safe_refine } from '$lib/calc/safe-refine';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Slider } from '$lib/components/ui/slider';
	import { parameters } from './parameters.svelte';

	const { equipment, refine_range } = $derived(parameters.current);

	const actual_equipment_price = $derived(
		calculate_equipment_price(equipment.base_price, equipment.state)
	);
	const [refine_from, refine_to] = $derived(refine_range);

	const output = $derived.by((): [string, string][] => {
		const { zeny, copy, material } = calculate_safe_refine(refine_from, refine_to);
		const copy_in_zeny = copy * actual_equipment_price;
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
		<Label for="base_equipment_price">Base equipment price</Label>

		<div class="flex items-center space-x-2">
			<Input
				type="number"
				bind:value={parameters.current.equipment.base_price}
				id="base_equipment_price"
				min="0"
				step="10000"
			/>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							variant={equipment.state === EquipmentState.Clean ? 'secondary' : 'destructive'}
							class="h-full w-12 text-sm font-medium">{equipment.state}</Button
						>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-36">
					<DropdownMenu.Group>
						<DropdownMenu.Label>Equipment state</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup bind:value={parameters.current.equipment.state}>
							{#each Object.entries(EquipmentState) as [key, value]}
								<DropdownMenu.RadioItem {value}>{key}</DropdownMenu.RadioItem>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>

		<p class="text-xs font-medium">
			Actual price: <span class="underline">{actual_equipment_price.toLocaleString()}z</span>
		</p>
	</div>

	<div class="flex flex-col space-y-2 sm:col-span-2">
		<Label for="refine_range">Refine range</Label>

		<input type="hidden" id="refine_range" value="{refine_from}-{refine_to}" />
		<Slider
			type="multiple"
			bind:value={parameters.current.refine_range}
			max={15}
			thumbPositioning="contain"
		/>
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
