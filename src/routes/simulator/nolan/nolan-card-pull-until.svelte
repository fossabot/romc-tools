<script lang="ts">
	import { toast } from 'svelte-sonner';

	import { gacha_costs, gacha_names, pull_card } from '$lib/calc/card-gacha';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	import NolanCardCombobox from './nolan-card-combobox.svelte';
	import { parameters } from './parameters.svelte';

	interface Props {
		class?: string;
	}

	const { class: className }: Props = $props();
	const { gacha_type, pull_until_target } = $derived(parameters.current);
	const gacha_name = $derived(gacha_names[gacha_type]);
	const gacha_cost = $derived(gacha_costs[gacha_type]);

	let is_pulling = $state(false);
	const pull = () => {
		toast.promise(
			new Promise<{ attempts: number }>((resolve, _reject) => {
				is_pulling = true;
				let attempts = 0;
				for (; pull_card(gacha_type).name !== pull_until_target?.name; attempts += 1);

				is_pulling = false;
				resolve({ attempts });
			}),
			{
				id: 'pull-until-toast',
				duration: 99_999,
				loading: 'Pulling...',
				classes: { title: 'whitespace-pre' },
				success: ({ attempts }) => {
					const total_cost = gacha_cost.amount * attempts;
					return [
						`Pulled ${attempts} times for ${pull_until_target?.name} card`,
						`it costs you ${total_cost.toLocaleString()} ${gacha_cost.name}`,
					].join('\n');
				},
			}
		);
	};
</script>

<Dialog.Root
	onOpenChangeComplete={(open) => {
		if (!open) toast.dismiss('pull-until-toast');
	}}
>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline', className })}
		>Pull until...</Dialog.Trigger
	>

	<Dialog.Content interactOutsideBehavior="ignore">
		<Dialog.Header>
			<Dialog.Title>{gacha_name} pull until simulator</Dialog.Title>
			<Dialog.Description>Choose your desired card.</Dialog.Description>
		</Dialog.Header>

		<Dialog.Footer class="grid grid-cols-4">
			<NolanCardCombobox
				bind:selected_value={parameters.current.pull_until_target}
				class="col-span-3"
			/>
			<Button
				class="col-span-1"
				onclick={pull}
				disabled={pull_until_target === undefined || is_pulling}>Pull</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
