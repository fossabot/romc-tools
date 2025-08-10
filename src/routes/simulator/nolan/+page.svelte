<script lang="ts">
	import { gacha_names, gacha_types, pull_card, type GachaItem } from '$lib/calc/card-gacha';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Switch } from '$lib/components/ui/switch';
	import { isDesktop } from '$lib/utils.svelte';

	import NolanCardPullUntil from './nolan-card-pull-until.svelte';
	import { parameters } from './parameters.svelte';

	const { gacha_type, sort_pulls } = $derived(parameters.current);
	const gacha_name = $derived(gacha_names[gacha_type]);

	let pull_results = $state<GachaItem[]>([]);
</script>

{#snippet PullButton(count: number)}
	{@const pull = () => (pull_results = Array.from({ length: count }, () => pull_card(gacha_type)))}
	{@const pulls = sort_pulls
		? [...pull_results].sort((a, b) => a.rate - b.rate || a.name.localeCompare(b.name))
		: pull_results}

	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants()} onclick={pull}>Pull {count}x</Dialog.Trigger>

		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>{gacha_name} pull results ({pull_results.length}x)</Dialog.Title>
				<Dialog.Description>Pulls are sorted by rate from lowest to highest.</Dialog.Description>
			</Dialog.Header>

			<ul
				class="grid max-h-[50vh] grid-flow-col gap-x-2 overflow-y-auto"
				style:grid-template-rows="repeat({count / (isDesktop.current ? 2 : 1)}, 1fr)"
				style:grid-auto-columns="1fr"
			>
				{#each pulls as { name, rate }}
					<li class="text-end text-sm font-medium">{name} ({rate}%)</li>
				{/each}
			</ul>

			{#if count > 1}
				<div class="flex items-center space-x-2 place-self-center">
					<Switch id="sort-pull-results" bind:checked={parameters.current.sort_pulls} />
					<Label for="sort-pull-results">Sort pulls</Label>
				</div>
			{/if}

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

	<div class="mt-4 grid w-full grid-cols-2 gap-2 sm:w-64">
		{@render PullButton(1)}
		{@render PullButton(10)}
		{@render PullButton(50)}
		{@render PullButton(100)}

		<NolanCardPullUntil class="col-span-2" />
	</div>
</div>
