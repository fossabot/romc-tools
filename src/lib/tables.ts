import { formatZeny, sum } from './utils';

export interface TableData {
	caption: string;
	rows: string[][];
}

export const tables = {
	'master-skill': () =>
		import('$lib/calc/master-skill').then(({ costs, MasterSkill }) => ({
			caption: 'Master skill cost data.',
			rows: [
				['Master skill', ...Array.from({ length: 10 }, (_, idx) => `Lv. ${idx + 1}`), 'Total'],
				...Object.entries(costs).map(([key, costs]) => [
					key,
					...costs.map(formatZeny),
					...Array.from(
						{
							// add padding for 1st and 2nd passive since they're only up to Lv. 5
							length: key === MasterSkill.Passive1 || key === MasterSkill.Passive2 ? 5 : 0,
						},
						() => 'n/a'
					),
					formatZeny(sum(costs)),
				]),
			],
		})),
	'safe-refine': () =>
		import('$lib/calc/safe-refine').then(({ costs }) => {
			const copies = costs.map(({ copy }) => copy);
			const materials = costs.map(({ material }) => material);
			const zenies = costs.map(({ zeny }) => zeny);

			return {
				caption: 'Safe refine cost data.',
				rows: [
					['Safe refine', ...Array.from({ length: 15 }, (_, idx) => `+${idx + 1}`), 'Total'],
					[
						'Equipment',
						...copies.map((copy) => (copy > 0 ? `${copy} copies` : 'none')),
						`${sum(copies)} copies`,
					],
					[
						'Material',
						...materials.map((material) => `${material} items`),
						`${sum(materials)} items`,
					],
					['Zeny', ...zenies.map((zeny) => formatZeny(zeny)), formatZeny(sum(zenies))],
				],
			};
		}),
	'skill-inheritance': () =>
		import('$lib/calc/skill-inheritance').then(({ costs }) => ({
			caption: 'Skill inheritance cost data.',
			rows: [
				['Skill rank', ...Array.from({ length: 10 }, (_, idx) => `Lv. ${idx + 1}`), 'Total'],
				...Object.entries(costs).map(([key, costs]) => [key, ...costs, sum(costs)].map(String)),
			],
		})),
} satisfies Record<string, () => Promise<TableData>>;

export type TableName = keyof typeof tables;
