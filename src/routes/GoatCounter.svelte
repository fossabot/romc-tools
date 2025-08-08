<script module lang="ts">
	interface GoatCounterVars {
		path: string;
	}

	declare global {
		interface Window {
			goatcounter:
				| undefined
				| {
						count: (vars: GoatCounterVars) => void;
				  };
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';

	import { GOATCOUNTER_ENDPOINT } from '$lib/constants';

	const track = (route_id?: string | null) => {
		if (window.goatcounter && route_id) {
			window.goatcounter.count({ path: route_id });
		}
	};

	onMount(() => track(page.route.id));
	onNavigate(({ to }) => {
		return () => track(to?.route.id);
	});
</script>

<svelte:head>
	<script
		data-goatcounter={GOATCOUNTER_ENDPOINT}
		data-goatcounter-settings={JSON.stringify({ no_onload: true })}
		async
		src="//gc.zgo.at/count.js"
	></script>
</svelte:head>
