<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-[100vh]">
	<nav class="flex w-full space-x-2 border-b px-8 py-4">
		<Button variant="ghost" href="/">Home</Button>
		<Button variant="ghost" href="/calculator/safe-refine">Safe refine</Button>
	</nav>

	<main class="mx-auto my-4 flex w-[60ch] flex-col">
		{@render children()}
	</main>
</div>
