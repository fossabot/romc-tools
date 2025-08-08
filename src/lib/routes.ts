import {
	CrownIcon,
	DatabaseIcon,
	DicesIcon,
	FlameIcon,
	HammerIcon,
	UserPenIcon,
	type Icon as IconType,
} from '@lucide/svelte';

export interface NavLink {
	path: string;
	title: string;
	Icon: typeof IconType;
}

export const routes = [
	{ path: '/calculator/master-skill', title: 'Master skill', Icon: CrownIcon },
	{ path: '/calculator/safe-refine', title: 'Safe refine', Icon: HammerIcon },
	{ path: '/calculator/skill-inheritance', title: 'Skill inheritance', Icon: FlameIcon },
	{ path: '/simulator/stat', title: 'Stat simulator', Icon: UserPenIcon },
	{ path: '/simulator/nolan', title: 'Nolan simulator', Icon: DicesIcon },
	{ path: '/data', title: 'View data', Icon: DatabaseIcon },
] as const satisfies NavLink[];

export const get_route_icon = ({ title }: Pick<NavLink, 'title'>) =>
	routes.find((it) => it.title === title)?.Icon;
export const get_route_id = ({ title }: Pick<NavLink, 'title'>) =>
	title.toLowerCase().replaceAll(' ', '-');
