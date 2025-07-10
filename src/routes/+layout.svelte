<script lang="ts">
	import { base } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-[100vh]">
	<nav
		class="flex w-full items-center border-b px-8 py-4 max-sm:flex-col max-sm:space-y-1 sm:space-x-2"
	>
		<Button variant="ghost" href="{base}/">Home</Button>
		<Button variant="ghost" href="{base}/calculator/safe-refine/">Safe refine</Button>
	</nav>

	<main class="mx-6 my-4 flex flex-col sm:mx-auto sm:w-[60ch]">
		{@render children()}
	</main>
</div>
