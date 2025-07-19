<script module lang="ts">
	export interface NavLink {
		id: string;
		title: string;
	}
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	interface Props {
		routes: NavLink[];
	}

	const { routes }: Props = $props();
</script>

{#snippet nav_link({ id, title }: NavLink, className?: string)}
	{@const href = `${base}${id}`}
	{@const active = page.url.pathname === href}
	<li
		aria-current={active ? 'page' : 'false'}
		class={cn('relative h-full', active && 'max-sm:underline', className)}
	>
		<Button {href} variant="ghost">{title}</Button>
	</li>
{/snippet}

<header class="border-b px-8 py-4">
	<nav class="w-full">
		<ul
			class="grid grid-cols-2 items-center justify-center justify-items-center gap-2 sm:flex sm:space-x-2"
		>
			{@render nav_link({ id: '/', title: 'Home' }, 'col-span-2')}

			{#each routes as route}
				{@render nav_link(route)}
			{/each}
		</ul>
	</nav>
</header>

<style>
	li[aria-current='page']::before {
		--size: 4px;
		content: '';
		position: absolute;
		left: calc(50% - var(--size));
		bottom: 0;
		border: var(--size) solid transparent;
		border-bottom-color: currentColor;
		view-transition-name: active-page-indicator;
	}

	@media (width > 40rem) {
		li[aria-current='page']::before {
			width: 100%;
			left: 0;
			border: 0;
			border-bottom: 2px solid currentColor;
		}
	}
</style>
