<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';

	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';

	import { Separator } from '$lib/components/ui/separator';

	import '../app.css';
	import Footer from './Footer.svelte';
	import Header, { type NavLink } from './Header.svelte';

	let { children } = $props();

	const { title = '[object Object]', description = '[object Object]' } = $derived(page.data);

	const routes = [
		{ id: '/calculator/master-skill', title: 'Master skill' },
		{ id: '/calculator/safe-refine', title: 'Safe refine' },
		{ id: '/calculator/skill-inheritance', title: 'Skill inheritance' },
		{ id: '/simulator/stat', title: 'Stat simulator' },
	] satisfies NavLink[];

	let transition_name = $state<'slide-1' | 'slide-2'>('slide-1');
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			const { from, to } = navigation;
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
	<title>{title} &bull; ROMC Tools</title>
	<meta name="description" content={description} />
</svelte:head>

<ModeWatcher />

<div class="flex min-h-[100vh] flex-col">
	<Header {routes} />

	<main class="mx-6 my-4 flex flex-1 flex-col sm:mx-auto sm:w-[60ch]">
		<div class="flex h-12 items-center justify-center sm:h-16">
			<h1
				class="text-center"
				style="view-transition-name: nav{page.url.pathname.replaceAll('/', '-')};"
			>
				{title}
			</h1>
		</div>

		<Separator class="my-2" />

		<div class="flex-1" style="view-transition-name: content-{transition_name};">
			{@render children()}
		</div>
	</main>

	<Footer />
</div>

<style>
	:root {
		view-transition-name: none;
	}

	:root::view-transition-old(content-slide-1),
	:root::view-transition-old(content-slide-2) {
		animation-timing-function: ease-out;
		animation-duration: 0.3s;
		animation-direction: normal;
	}

	:root::view-transition-new(content-slide-1),
	:root::view-transition-new(content-slide-2) {
		animation-timing-function: ease-in;
		animation-duration: 0.3s;
		animation-direction: reverse;
	}
	:root::view-transition-old(content-slide-1),
	:root::view-transition-new(content-slide-2) {
		animation-name: slide-left, fade;
	}

	:root::view-transition-new(content-slide-1),
	:root::view-transition-old(content-slide-2) {
		animation-name: slide-right, fade;
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

	@keyframes fade {
		to {
			opacity: 0%;
		}
	}
</style>
