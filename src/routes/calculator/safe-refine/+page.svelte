<script lang="ts">
	import {
		calculate_equipment_price,
		calculate_safe_refine_cost,
		EquipmentState,
	} from '$lib/calc/safe-refine';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Slider } from '$lib/components/ui/slider';
	import { Switch } from '$lib/components/ui/switch';
	import { formatZeny } from '$lib/utils';
	import { parameters } from './parameters.svelte';

	let { equipment, options, refine_range } = $derived(parameters.current);
	const equipment_price = $derived(calculate_equipment_price(equipment));

	const refine_cost = $derived(
		calculate_safe_refine_cost(refine_range, {
			equipment,
			apply_home_rating_discount: options.apply_home_rating_discount,
			material_price: options.exclude_material_cost ? 0 : 25_000,
		})
	);

	const output = $derived.by(() => {
		const { zeny, copy, copy_zeny, material, material_zeny } = refine_cost;
		const total = zeny + material_zeny + copy_zeny;

		return [
			{ key: 'Zeny', zeny_value: zeny },
			{
				key: 'Equipment',
				value: `${copy} copies`,
				zeny_value: copy_zeny,
			},
			{
				key: 'Material',
				value: `${material} items`,
				zeny_value: material_zeny,
			},
			{ key: 'Total zeny', zeny_value: total },
		];
	});
</script>

<div class="mt-6 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
	<div class="flex flex-col space-y-2">
		<Label for="base_equipment_price">Base equipment price</Label>

		<div class="flex items-center space-x-2">
			<Input
				type="number"
				bind:value={equipment.base_price}
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
							class="h-full w-12 text-sm font-medium select-none">{equipment.state}</Button
						>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-36">
					<DropdownMenu.Group>
						<DropdownMenu.Label>Equipment state</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup bind:value={equipment.state}>
							{#each Object.values(EquipmentState) as value, idx}
								{@const key = idx > 0 ? `Broken +${idx}` : 'Clean'}
								<DropdownMenu.RadioItem {value}>{key}</DropdownMenu.RadioItem>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>

		<p class="text-xs font-medium">
			Equipment price: <span class="underline">{formatZeny(equipment_price)}</span>
		</p>
	</div>

	<div class="flex max-sm:space-x-4 sm:flex-col">
		<div class="flex flex-1 items-center space-x-2">
			<Switch bind:checked={options.apply_home_rating_discount} id="apply_home_rating_discount" />
			<Label for="apply_home_rating_discount">Apply home rating discount</Label>
		</div>

		<div class="flex flex-1 items-center space-x-2">
			<Switch bind:checked={options.exclude_material_cost} id="exclude_material_cost" />
			<Label for="exclude_material_cost">Exclude material zeny cost</Label>
		</div>
	</div>

	<div class="flex flex-col space-y-2 sm:col-span-2">
		<Label for="refine_range">Refine range</Label>

		<Slider type="multiple" id="refine_range" bind:value={refine_range} max={15} />
	</div>
</div>

<Separator class="my-2" />

<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
	{#each output as { key, value, zeny_value }}
		{@const zeny_cost = formatZeny(zeny_value)}
		<div class="-space-y-1 text-center sm:text-end">
			<p class="text-sm font-medium">{key}</p>
			<p class="text-lg font-semibold underline">
				{#if value !== undefined}
					{value} / {zeny_cost}
				{:else}
					{zeny_cost}
				{/if}
			</p>
		</div>
	{/each}
</div>
