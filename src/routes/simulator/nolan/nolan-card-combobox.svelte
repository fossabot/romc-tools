<script lang="ts">
	import { CheckIcon, ChevronsUpDownIcon } from '@lucide/svelte';

	import { gacha_table, type GachaItem } from '$lib/calc/card-gacha';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import { isDesktop } from '$lib/utils.svelte';

	import { parameters } from './parameters.svelte';

	interface Props {
		class?: string;
		selected_value?: GachaItem;
	}

	let { class: className, selected_value = $bindable() }: Props = $props();
	const { gacha_type } = $derived(parameters.current);

	const cards = $derived(
		[...gacha_table[gacha_type]].sort((a, b) => a.rate - b.rate || a.name.localeCompare(b.name))
	);

	let open = $state(false);
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline" class={cn('justify-between', className)} role="combobox">
				{selected_value !== undefined
					? `${selected_value.name} (${selected_value.rate}%)`
					: 'Select a card...'}
				<ChevronsUpDownIcon class="opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="h-[40vh] p-0" side={isDesktop.current ? 'bottom' : 'top'}>
		<Command.Root>
			<Command.Input placeholder="Search card..." />
			<Command.List>
				<Command.Empty>No card found.</Command.Empty>
				<Command.Group value="cards">
					{#each cards as card (card.name)}
						<Command.Item
							value={card.name}
							keywords={[card.name, card.rate.toString()]}
							onSelect={() => {
								selected_value = card;
								open = false;
							}}
						>
							<CheckIcon class={cn(selected_value?.name !== card.name && 'text-transparent')} />
							{card.name} ({card.rate}%)
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
