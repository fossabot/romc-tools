<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { Separator } from '$lib/components/ui/separator';
	import { ModeWatcher } from 'mode-watcher';
	import Header from './Header.svelte';
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
	<Header {routes} />

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
	:root {
		view-transition-name: none;
	}

	:root::view-transition-old(heading),
	:root::view-transition-new(heading) {
		animation-timing-function: ease-in-out;
		animation-name: fade;
		animation-duration: 0.3s;
	}

	:root::view-transition-old(*) {
		animation-timing-function: linear;
		animation-duration: 0.25s;
		animation-direction: normal;
	}

	:root::view-transition-new(*) {
		animation-timing-function: ease-in;
		animation-duration: 0.3s;
		animation-direction: reverse;
	}

	:root::view-transition-old(content-slide-1),
	:root::view-transition-new(content-slide-2) {
		animation-name: fade;
	}

	:root::view-transition-new(content-slide-1),
	:root::view-transition-old(content-slide-2) {
		animation-name: slide-down, fade;
	}

	@media (width > 40rem /* sm breakpoint */) {
		:root::view-transition-old(content-slide-1),
		:root::view-transition-new(content-slide-2) {
			animation-name: slide-left, fade;
		}

		:root::view-transition-new(content-slide-1),
		:root::view-transition-old(content-slide-2) {
			animation-name: slide-right, fade;
		}
	}

	@keyframes slide-right {
		to {
			transform: translateX(50%);
		}
	}

	@keyframes slide-left {
		to {
			transform: translateX(-50%);
		}
	}

	@keyframes slide-down {
		to {
			transform: translateY(34%);
		}
	}

	@keyframes fade {
		to {
			opacity: 0%;
		}
	}
</style>
