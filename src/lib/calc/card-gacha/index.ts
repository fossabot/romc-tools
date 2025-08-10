import { sum } from '$lib/utils';

import gram_table from './table-gram.csv';
import nolan_table from './table-nolan.csv';

export const gacha_types = ['gram', 'nolan'] as const;
export type GachaType = (typeof gacha_types)[number];

export const gacha_names = {
	gram: 'MVP Card Crafting',
	nolan: 'Combined Fate',
} satisfies Record<GachaType, string>;

interface GachaCost {
	name: string;
	amount: number;
}

export const gacha_costs = {
	gram: { amount: 12, name: 'Gram crystals' },
	nolan: { amount: 1500, name: 'Nolan cards' },
} satisfies Record<GachaType, GachaCost>;

export interface GachaItem {
	name: string;
	rate: number;
	cumulative_rate: number;
}

const preprocess_gacha_table = (table: (typeof import('*.csv'))['default']) => {
	const total_rate = sum(table.map(({ rate }) => Number(rate)));

	return table
		.map(({ name, rate }) => ({ name, rate: Number(rate) }))
		.reduce<
			GachaItem[]
		>((acc, { name, rate }) => [...acc, { name, rate, cumulative_rate: (acc.at(-1)?.cumulative_rate ?? 0) + rate / total_rate }], []);
};

export const gacha_table = {
	nolan: preprocess_gacha_table(nolan_table),
	gram: preprocess_gacha_table(gram_table),
};

export const pull_card = (type: GachaType) => {
	const random = Math.random();
	const pools = gacha_table[type];
	return pools.find(({ cumulative_rate }) => random < cumulative_rate) ?? pools.at(-1)!;
};
