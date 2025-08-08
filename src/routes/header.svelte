<script lang="ts">
	import { ChevronDownIcon, MenuIcon, MoonIcon, SunIcon, XIcon } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';

	import { base } from '$app/paths';
	import { page } from '$app/state';

	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { WEBSITE_NAME } from '$lib/constants';
	import { routes, type NavLink } from '$lib/routes';
	import { cn } from '$lib/utils';

	const current_path = $derived(page.url.pathname.replace(base, ''));

	interface BreadcrumbContent {
		path: string;
		label: string;
		others?: NavLink[];
	}

	const breadcrumbs = $derived.by((): BreadcrumbContent[] => {
		const paths = current_path.split('/').filter((path) => path !== '');

		return paths
			.map((label, idx) => ({ label, path: '/' + paths.slice(0, idx + 1).join('/') }))
			.map(({ label, path }) => ({
				label:
					routes.find((it) => it.path === path)?.title ??
					label.charAt(0).toUpperCase() + label.slice(1),
				others: routes.filter((it) => it.path !== current_path && it.path.startsWith(path)),
				path,
			}));
	});

	let openMenu = $state(false);
	const menus = $derived(routes.filter((it) => it.path !== current_path));
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
	<Breadcrumb.Root class="max-sm:hidden">
		<Breadcrumb.List>
			{@render BreadcrumbItem({ path: '/', label: WEBSITE_NAME })}

			{#each breadcrumbs as breadcrumb}
				<Breadcrumb.Separator />

				{@render BreadcrumbItem(breadcrumb)}
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
{/snippet}

{#snippet MobileMenu()}
	<DropdownMenu.Root bind:open={openMenu}>
		<DropdownMenu.Trigger
			class={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'sm:hidden')}
		>
			<MenuIcon
				class={cn('absolute transition-all', openMenu ? 'scale-0 -rotate-90' : 'scale-100')}
			/>
			<XIcon class={cn('absolute transition-all', openMenu ? 'scale-100' : 'scale-0 rotate-90')} />
			<span class="sr-only">Toggle menu</span>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content collisionPadding={12}>
			<DropdownMenu.Group>
				<DropdownMenu.Label>Menu</DropdownMenu.Label>
				<DropdownMenu.Separator />
				{#each menus as { path, title, Icon }}
					<DropdownMenu.Item>
						{#snippet child({ props })}
							<a href="{base}{path}" {...props}>
								<Icon />
								{title}
							</a>
						{/snippet}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<Button href="{base}/" variant="ghost" class="sm:hidden">{WEBSITE_NAME}</Button>
{/snippet}

{#snippet ThemeToggle()}
	<Button variant="ghost" size="icon" onclick={toggleMode}>
		<SunIcon
			class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
		/>
		<MoonIcon
			class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
{/snippet}

<header class="flex items-center justify-between border-b px-4 py-4 sm:px-8">
	{@render Breadcrumbs()}

	{@render MobileMenu()}

	{@render ThemeToggle()}
</header>
