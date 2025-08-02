import { sum } from '$lib/utils';

export const stat_names = ['STR', 'AGI', 'VIT', 'INT', 'DEX', 'LUK'] as const;
export type StatName = (typeof stat_names)[number];

export const get_next_stat_cost = (allocated: number) =>
	allocated < 9 ? 2 : Math.floor((allocated - 9) / 10) + 3;

export const get_total_stat_cost = (allocated: number) =>
	sum(Array.from({ length: allocated }, (_, i) => get_next_stat_cost(i)));

export const get_max_stat_possible = (
	allocated: number,
	remaining_points: number,
	max_stat: number
): number =>
	allocated >= max_stat || remaining_points < get_next_stat_cost(allocated)
		? Math.min(allocated, max_stat)
		: get_max_stat_possible(
				allocated + 1,
				remaining_points - get_next_stat_cost(allocated),
				max_stat
			);
