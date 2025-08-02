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

	interface Props {
		routes: NavLink[];
	}

	const { routes }: Props = $props();
</script>

{#snippet nav_link({ id, title }: NavLink, isHome: boolean = false)}
	{@const pathname = `${base}${id}`}
	{@const active = page.url.pathname === pathname}

	<li
		aria-current={active ? 'page' : 'false'}
		style:view-transition-name={active ? '' : `nav${pathname.replaceAll('/', '-')}`}
		class:col-span-2={isHome}
	>
		<Button href={pathname} variant="ghost" disabled={active}>{title}</Button>
	</li>
{/snippet}

<header class="border-b px-8 py-4">
	<nav class="w-full">
		<ul
			class="grid grid-flow-col grid-cols-2 grid-rows-3 items-center justify-center justify-items-center gap-2 sm:flex sm:space-x-2"
		>
			{@render nav_link({ id: '/', title: 'Home' }, true)}

			{#each routes as route}
				{@render nav_link(route)}
			{/each}
		</ul>
	</nav>
</header>
