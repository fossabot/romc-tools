import type { TableData } from '$lib/data';
import { sum } from '$lib/utils';

export enum InheritanceQuality {
	Rank1 = 'Rank 1',
	Rank2 = 'Rank 2',
	Rank3 = 'Rank 3',
}

export type Inheritance = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type InheritanceRange = [Inheritance, Inheritance];

export const costs = {
	[InheritanceQuality.Rank1]: [12, 2, 4, 6, 8, 12, 18, 24, 32, 40],
	[InheritanceQuality.Rank2]: [30, 6, 8, 12, 16, 24, 32, 42, 60, 90],
	[InheritanceQuality.Rank3]: [60, 10, 20, 30, 40, 50, 70, 100, 140, 200],
} satisfies Record<InheritanceQuality, number[]>;

export const calculate_skill_inheritance_shard = (
	quality: InheritanceQuality,
	[from, to]: InheritanceRange
) => sum(costs[quality].slice(from, to));

export const get_table = (): TableData => ({
	caption: 'Skill inheritance cost data.',
	rows: [
		['Skill rank', ...Array.from({ length: 10 }, (_, idx) => `Lv. ${idx + 1}`), 'Total'],
		...Object.entries(costs).map(([key, costs]) => [key, ...costs, sum(costs)].map(String)),
	],
});
