<script lang="ts">
	import { ChevronDownIcon } from '@lucide/svelte';

	import { base } from '$app/paths';
	import { page } from '$app/state';

	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { routes, type NavLink } from '$lib/routes';

	interface BreadcrumbContent {
		path: string;
		label: string;
		others?: NavLink[];
	}

	const breadcrumbs = $derived.by((): BreadcrumbContent[] => {
		const paths = page.url.pathname
			.replace(base, '')
			.split('/')
			.filter((path) => path !== '');

		return paths
			.map((label, idx) => ({ label, path: '/' + paths.slice(0, idx + 1).join('/') }))
			.map(({ label, path }) => ({
				label:
					routes.find((it) => it.path === path)?.title ??
					label.charAt(0).toUpperCase() + label.slice(1),
				others: routes.filter((it) => it.path !== page.url.pathname && it.path.startsWith(path)),
				path,
			}));
	});
</script>

{#snippet BreadcrumbItem({ path, label, others }: BreadcrumbContent)}
	{@const href = `${base}${path}`}

	<Breadcrumb.Item>
		{#if page.url.pathname === href}
			<Breadcrumb.Page>{label}</Breadcrumb.Page>
		{:else if others !== undefined}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="flex items-center gap-1">
					{label}
					<ChevronDownIcon class="size-4" />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="start">
					{#each others as { path, title, Icon }}
						<DropdownMenu.Item>
							{#snippet child({ props })}
								<a href="{base}{path}" {...props}>
									<Icon />
									{title}
								</a>
							{/snippet}
						</DropdownMenu.Item>
					{:else}
						<DropdownMenu.Item>No item.</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<Breadcrumb.Link {href}>{label}</Breadcrumb.Link>
		{/if}
	</Breadcrumb.Item>
{/snippet}

<header class="border-b px-8 py-4">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			{@render BreadcrumbItem({ path: '/', label: 'Home' })}

			{#each breadcrumbs as breadcrumb}
				<Breadcrumb.Separator />

				{@render BreadcrumbItem(breadcrumb)}
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
</header>
