<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { cn } from '$lib/utils';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();

	const { title = 'Error' } = $derived(page.data);

	const routes = [
		{ id: '/', title: 'Home' },
		{ id: '/calculator/master-skill', title: 'Master skill' },
		{ id: '/calculator/safe-refine', title: 'Safe refine' },
	];

	let transition_name = $state<'slide-1' | 'slide-2'>('slide-1');
	onNavigate((navigation) => {
		const { from, to } = navigation;
		if (!document.startViewTransition || from?.route.id === to?.route.id) return;

		return new Promise((resolve) => {
			transition_name =
				routes.findIndex(({ id }) => id === from?.route.id) <
				routes.findIndex(({ id }) => id === to?.route.id)
					? 'slide-1'
					: 'slide-2';

			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<ModeWatcher />

<div class="flex min-h-[100vh] flex-col">
	<nav
		class="flex w-full items-center border-b px-8 py-4 max-sm:flex-col max-sm:space-y-1 sm:space-x-2"
	>
		{#each routes as { id, title }}
			{@const href = `${base}${id}`}
			{@const active = page.url.pathname === href}
			<Button
				{href}
				variant="ghost"
				aria-current={active ? 'page' : 'false'}
				class={cn(active && 'underline')}
			>
				{title}
			</Button>
		{/each}
	</nav>

	<main class="mx-6 my-4 flex flex-1 flex-col sm:mx-auto sm:w-[60ch]">
		<div
			class="flex h-12 items-center justify-center sm:h-16"
			style="view-transition-name: heading;"
		>
			<h1 class="text-center">{title}</h1>
		</div>

		<Separator class="my-2" />

		<div class="flex-1" style="view-transition-name: content-{transition_name};">
			{@render children()}
		</div>
	</main>
</div>

<style>
	@media not (prefers-reduced-motion) {
		:root {
			view-transition-name: none;
		}

		:global(::view-transition-old(heading)),
		:global(::view-transition-new(heading)) {
			animation-timing-function: ease-in-out;
			animation-name: fade;
			animation-duration: 0.3s;
		}

		:global(::view-transition-old(*)) {
			animation-timing-function: linear;
			animation-duration: 0.25s;
			animation-direction: normal;
		}

		:global(::view-transition-new(*)) {
			animation-timing-function: ease-in;
			animation-duration: 0.3s;
			animation-direction: reverse;
		}

		:global(::view-transition-old(content-slide-1)),
		:global(::view-transition-new(content-slide-2)) {
			animation-name: fade;
		}

		:global(::view-transition-new(content-slide-1)),
		:global(::view-transition-old(content-slide-2)) {
			animation-name: slide-down, fade;
		}

		@media (width > 40rem /* sm breakpoint */) {
			:global(::view-transition-old(content-slide-1)),
			:global(::view-transition-new(content-slide-2)) {
				animation-name: slide-left, fade;
			}

			:global(::view-transition-new(content-slide-1)),
			:global(::view-transition-old(content-slide-2)) {
				animation-name: slide-right, fade;
			}
		}
	}

	@keyframes slide-right {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(50%);
		}
	}

	@keyframes slide-left {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(-50%);
		}
	}

	@keyframes slide-down {
		from {
			transform: translateY(0);
		}

		to {
			transform: translateY(34%);
		}
	}

	@keyframes fade {
		from {
			opacity: 100%;
		}

		to {
			opacity: 0%;
		}
	}
</style>
