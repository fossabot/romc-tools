<script lang="ts">
	import { ChevronDownIcon, MoonIcon, SunIcon } from '@lucide/svelte';
	import { resetMode, setMode } from 'mode-watcher';

	import { base } from '$app/paths';
	import { page } from '$app/state';

	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { buttonVariants } from '$lib/components/ui/button';
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

{#snippet Breadcrumbs()}
	<Breadcrumb.Root>
		<Breadcrumb.List>
			{@render BreadcrumbItem({ path: '/', label: 'Home' })}

			{#each breadcrumbs as breadcrumb}
				<Breadcrumb.Separator />

				{@render BreadcrumbItem(breadcrumb)}
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
{/snippet}

{#snippet ThemeToggle()}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Item onclick={() => setMode('light')}>Light</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => setMode('dark')}>Dark</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}

<header class="flex items-center justify-between border-b px-8 py-4">
	{@render Breadcrumbs()}

	{@render ThemeToggle()}
</header>
