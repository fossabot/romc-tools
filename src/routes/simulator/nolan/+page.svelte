<script lang="ts">
	import { tick } from 'svelte';

	import { replaceState } from '$app/navigation';

	import { gacha_names, gacha_types } from '$lib/calc/card-gacha';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	import NolanCardPullButton from './nolan-card-pull-button.svelte';
	import NolanCardPullUntilButton from './nolan-card-pull-until-button.svelte';
	import { parameters } from './parameters.svelte';

	$effect(() => {
		tick().then(() =>
			replaceState('', { table_id_override: `${parameters.current.gacha_type}-gacha` })
		);
	});
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

	<div class="mt-4 grid w-full grid-cols-2 gap-2 sm:w-64">
		{#each [1, 10, 50, 100] as count}
			<NolanCardPullButton {count} />
		{/each}

		<NolanCardPullUntilButton class="col-span-2" />
	</div>
</div>
