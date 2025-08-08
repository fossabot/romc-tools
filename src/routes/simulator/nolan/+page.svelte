<script lang="ts">
	import { toast } from 'svelte-sonner';

	import { gacha_names, gacha_types, pull_card } from '$lib/calc/card-gacha';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	import { parameters } from './parameters.svelte';

	const { gacha_type } = $derived(parameters.current);
	const gacha_name = $derived(gacha_names[gacha_type]);

	const pull = () => {
		const { name, rate } = pull_card(gacha_type);
		toast.info(`${gacha_name} pull result`, {
			description: `${name} (${rate}%)`,
			action: { label: 'Again', onClick: pull },
			duration: 5000,
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

	<Button class="mt-4 w-64" onclick={pull}>Pull</Button>
</div>
