<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();

	const { title = 'Error' } = $derived(page.data);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<ModeWatcher />

<div class="min-h-[100vh]">
	<nav
		class="flex w-full items-center border-b px-8 py-4 max-sm:flex-col max-sm:space-y-1 sm:space-x-2"
	>
		<Button variant="ghost" href="{base}/">Home</Button>
		<Button variant="ghost" href="{base}/calculator/master-skill/">Master skill</Button>
		<Button variant="ghost" href="{base}/calculator/safe-refine/">Safe refine</Button>
	</nav>

	<main class="mx-6 my-4 flex flex-col sm:mx-auto sm:w-[60ch]">
		<h1>{title}</h1>

		<Separator class="my-2" />

		{@render children()}
	</main>
</div>
