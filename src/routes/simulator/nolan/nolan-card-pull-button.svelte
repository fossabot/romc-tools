<script lang="ts">
	import { pull_card, type GachaItem } from '$lib/calc/card-gacha';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { isDesktop } from '$lib/utils.svelte';

	import { parameters, computed } from './parameters.svelte';

	interface Props {
		count: number;
	}

	const { count }: Props = $props();
	const { gacha_type, sort_pulls } = $derived(parameters.current);
	const { gacha_name } = $derived(computed);

	let pull_results = $state<GachaItem[]>([]);
	const pull = () => (pull_results = Array.from({ length: count }, () => pull_card(gacha_type)));
	const pulls = $derived(
		sort_pulls
			? Object.entries(
					[...pull_results]
						.sort((a, b) => a.rate - b.rate || a.name.localeCompare(b.name))
						.reduce(
							(acc, { name, rate }) => {
								acc[name] ??= { rate, amount: 0 };
								acc[name].amount += 1;
								return acc;
							},
							{} as Record<string, { rate: number; amount: number }>
						)
				).map(([name, { amount, rate }]) => `${name} ${amount}x (${rate}%)`)
			: pull_results.map(({ name, rate }) => `${name} (${rate}%)`)
	);
</script>

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
			{#each pulls as item}
				<li class="text-end text-sm font-medium">{item}</li>
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
