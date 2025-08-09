<script lang="ts">
	import { gacha_names, gacha_types, pull_card, type GachaItem } from '$lib/calc/card-gacha';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { isDesktop } from '$lib/utils.svelte';

	import { parameters } from './parameters.svelte';

	const { gacha_type } = $derived(parameters.current);
	const gacha_name = $derived(gacha_names[gacha_type]);

	let pull_results = $state<GachaItem[]>([]);
</script>

{#snippet PullButton(count: number)}
	{@const pull = () =>
		(pull_results = Array.from({ length: count }, () => pull_card(gacha_type)).sort(
			(a, b) => a.rate - b.rate
		))}

	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })} onclick={pull}
			>Pull {count}x</Dialog.Trigger
		>

		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>{gacha_name} pull results ({pull_results.length}x)</Dialog.Title>
				<Dialog.Description>Pulls are sorted by rate from lowest to highest.</Dialog.Description>
			</Dialog.Header>

			<ul
				class="grid max-h-[50vh] grid-flow-col overflow-y-auto"
				style:grid-template-rows="repeat({count / (isDesktop.current ? 2 : 1)}, 1fr)"
				style:grid-auto-columns="1fr"
			>
				{#each pull_results as { name, rate }}
					<li class="text-center text-sm font-medium">{name} ({rate}%)</li>
				{/each}
			</ul>

			<Dialog.Footer>
				<Button onclick={pull}>Pull again</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/snippet}

<div class="mt-8 mb-6 flex flex-col items-center">
	<RadioGroup.Root bind:value={parameters.current.gacha_type}>
		{#each gacha_types as type}
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value={type} id={type} />
				<Label for={type}>{gacha_names[type]}</Label>
			</div>
		{/each}
	</RadioGroup.Root>

	<div class="mt-4 grid w-48 gap-2 sm:w-64 sm:grid-cols-2">
		{@render PullButton(1)}
		{@render PullButton(10)}
		{@render PullButton(50)}
		{@render PullButton(100)}
	</div>
</div>
