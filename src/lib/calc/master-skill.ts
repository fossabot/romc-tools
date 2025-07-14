import { sum } from '$lib/utils';

export enum MasterSkill {
	Active = 'Active',
	Passive1 = '1st Passive',
	Passive2 = '2nd Passive',
	Passive3 = '3rd Passive',
}

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
} satisfies Record<MasterSkill, number[]>;

export const calculate_master_skill_cost = (levels: Record<MasterSkill, [number, number]>) =>
	Object.fromEntries(
		Object.entries(levels).map(([key, [from, to]]) => [
			key as MasterSkill,
			sum(costs[key as MasterSkill].slice(from, to)),
		])
	) as Record<MasterSkill, number>;
