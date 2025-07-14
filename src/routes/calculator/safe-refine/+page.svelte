<script lang="ts">
	import {
		calculate_equipment_price,
		calculate_safe_refine_cost,
		EquipmentState,
	} from '$lib/calc/safe-refine';
	import { calculate_safe_refine } from '$lib/calc/safe-refine';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Slider } from '$lib/components/ui/slider';
	import { Switch } from '$lib/components/ui/switch';
	import { parameters } from './parameters.svelte';

	const { equipment, options, refine_range } = $derived(parameters.current);

	const equipment_price = $derived(
		calculate_equipment_price(equipment.base_price, equipment.state)
	);

	const [refine_from, refine_to] = $derived(refine_range);
	const refine_cost = $derived(calculate_safe_refine(refine_from, refine_to));
	const { zeny, copy_zeny, material_zeny } = $derived(
		calculate_safe_refine_cost(refine_cost, {
			equipment,
			apply_home_rating_discount: options.apply_home_rating_discount,
			material_price: options.exclude_material_cost ? 0 : 25_000,
		})
	);

	const output = $derived.by(() => {
		const { copy, material } = refine_cost;
		const total = zeny + material_zeny + copy_zeny;

		return [
			{ key: 'Zeny', zeny_value: `${zeny.toLocaleString()}z` },
			{
				key: 'Equipment',
				value: `${copy} copies`,
				zeny_value: `${copy_zeny.toLocaleString()}z`,
			},
			{
				key: 'Material',
				value: `${material} items`,
				zeny_value: `${material_zeny.toLocaleString()}z`,
			},
			{ key: 'Total zeny', zeny_value: `${total.toLocaleString()}z` },
		];
	});
</script>

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
			Equipment price: <span class="underline">{equipment_price.toLocaleString()}z</span>
		</p>
	</div>

	<div class="flex max-sm:space-x-4 sm:flex-col">
		<div class="flex flex-1 items-center space-x-2">
			<Switch
				bind:checked={parameters.current.options.apply_home_rating_discount}
				id="apply_home_rating_discount"
			/>
			<Label for="apply_home_rating_discount">Apply home rating discount</Label>
		</div>

		<div class="flex flex-1 items-center space-x-2">
			<Switch
				bind:checked={parameters.current.options.exclude_material_cost}
				id="exclude_material_cost"
			/>
			<Label for="exclude_material_cost">Exclude material zeny cost</Label>
		</div>
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
	{#each output as { key, value, zeny_value }}
		<div class="flex flex-col -space-y-1 text-center sm:text-end">
			<p class="text-sm font-medium">{key}</p>
			<p class="text-lg font-semibold underline">
				{#if value !== undefined}
					{value} / {zeny_value}
				{:else}
					{zeny_value}
				{/if}
			</p>
		</div>
	{/each}
</div>
