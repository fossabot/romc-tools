<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		routes: { id: string; title: string }[];
	}

	const { routes }: Props = $props();
</script>

<header class="border-b px-8 py-4">
	<nav class="w-full">
		<ul class="flex items-center justify-center max-sm:flex-col max-sm:space-y-1 sm:space-x-2">
			{#each routes as { id, title }}
				{@const href = `${base}${id}`}
				{@const active = page.url.pathname === href}
				<li aria-current={active ? 'page' : 'false'} class="relative h-full">
					<Button {href} variant="ghost">{title}</Button>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	li[aria-current='page']::before {
		content: '';
		position: absolute;
		bottom: 0;
		height: 100%;
		width: 100%;
		border-width: 0px 2px;
		border-style: solid;
		border-color: currentColor;
		view-transition-name: active-page-indicator;
	}

	@media (width > 40rem) {
		li[aria-current='page']::before {
			border-width: 0px;
			height: 0;
			border-bottom-width: 2px;
		}
	}
</style>
