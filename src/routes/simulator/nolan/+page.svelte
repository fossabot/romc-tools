<script lang="ts">
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';

	import { gacha_names, gacha_types, pull_card } from '$lib/calc/card-gacha';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	import { parameters } from './parameters.svelte';

	const { gacha_type } = $derived(parameters.current);
	const gacha_name = $derived(gacha_names[gacha_type]);

	const pull = (count: 1 | 10) => {
		toast.dismiss();

		const pull1 = () => {
			const { name, rate } = pull_card(gacha_type);
			return `${name} (${rate}%)`;
		};

		const pull10 = () =>
			Array.from({ length: 10 }, () => pull_card(gacha_type))
				.sort(({ rate: a }, { rate: b }) => a - b)
				.map(
					({ name, rate }, idx) => `${(idx + 1).toString().padStart(2, '0')}. ${name} (${rate}%)`
				)
				.join('\n');

		tick().then(() => {
			toast.info(`${gacha_name} pull result`, {
				description: count === 1 ? pull1() : pull10(),
				action: { label: 'Again', onClick: () => pull(count) },
				duration: 10_000,
				descriptionClass: 'whitespace-pre',
			});
		});
	};
</script>

<div class="mt-8 mb-6 flex flex-col items-center">
	<RadioGroup.Root bind:value={parameters.current.gacha_type}>
		{#each gacha_types as type}
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value={type} id={type} />
				<Label for={type}>{gacha_names[type]}</Label>
			</div>
		{/each}
	</RadioGroup.Root>

	<div class="mt-4 flex w-48 gap-2 max-sm:flex-col sm:w-64">
		<Button class="flex-1" onclick={() => pull(1)}>Pull 1x</Button>
		<Button class="flex-1" onclick={() => pull(10)}>Pull 10x</Button>
	</div>
</div>
