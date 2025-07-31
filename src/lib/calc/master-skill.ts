import type { TableData } from '$lib/data';
import { formatZeny, sum } from '$lib/utils';

export enum MasterSkill {
	Active = 'Active',
	Passive1 = '1st Passive',
	Passive2 = '2nd Passive',
	Passive3 = '3rd Passive',
}

export interface MasterSkillRange {
	[MasterSkill.Active]: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	[MasterSkill.Passive1]: 0 | 1 | 2 | 3 | 4 | 5;
	[MasterSkill.Passive2]: 0 | 1 | 2 | 3 | 4 | 5;
	[MasterSkill.Passive3]: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export type MasterSkillLevel = {
	-readonly [k in keyof MasterSkillRange]: [MasterSkillRange[k], MasterSkillRange[k]];
};

export const costs = {
	[MasterSkill.Active]: [
		2_000_000, 3_000_000, 4_000_000, 5_000_000, 6_000_000, 7_000_000, 8_000_000, 10_000_000,
		15_000_000, 20_000_000,
	],
	[MasterSkill.Passive1]: [2_000_000, 4_000_000, 6_000_000, 8_000_000, 10_000_000],
	[MasterSkill.Passive2]: [2_000_000, 4_000_000, 6_000_000, 8_000_000, 10_000_000],
	[MasterSkill.Passive3]: [
		1_500_000, 2_000_000, 2_500_000, 3_000_000, 4_000_000, 5_500_000, 7_000_000, 8_500_000,
		10_000_000, 15_000_000,
	],
} satisfies Record<keyof MasterSkillLevel, number[]>;

export const calculate_master_skill_cost = (levels: MasterSkillLevel) =>
	Object.fromEntries(
		Object.entries(levels)
			.map(([key, value]) => [key as keyof MasterSkillLevel, value] as const)
			.map(([key, [from, to]]) => [key, sum(costs[key].slice(from, to))])
	) as Record<keyof MasterSkillLevel, number>;

export const get_table = (): TableData => ({
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
});
