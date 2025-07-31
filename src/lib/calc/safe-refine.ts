import type { TableData } from '$lib/data';
import { formatZeny, sum } from '$lib/utils';

export interface SafeRefineCost {
	/** The zeny cost */
	zeny: number;
	/** How many equipment copies needed */
	copy: number;
	/** How many refine material (oridecon, elunium, mithril) needed */
	material: number;
}

export interface SafeRefineOptions {
	/** Whether to apply home rating discount (5% zeny) */
	apply_home_rating_discount: boolean;
	/** The oridecon/elunium/mithril price */
	material_price: number;

	equipment: {
		base_price: number;
		state: EquipmentState;
	};
}

export type Refine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export type RefineRange = [Refine, Refine];

export enum EquipmentState {
	Clean = '+0',
	Broken1 = '+1',
	Broken2 = '+2',
	Broken3 = '+3',
	Broken4 = '+4',
}

export const costs: SafeRefineCost[] = [
	{ zeny: 10_000, copy: 0, material: 1 },
	{ zeny: 20_000, copy: 0, material: 1 },
	{ zeny: 30_000, copy: 0, material: 1 },
	{ zeny: 40_000, copy: 0, material: 1 },
	{ zeny: 100_000, copy: 1, material: 5 },
	{ zeny: 220_000, copy: 2, material: 10 },
	{ zeny: 470_000, copy: 3, material: 15 },
	{ zeny: 910_000, copy: 4, material: 25 },
	{ zeny: 1_630_000, copy: 6, material: 50 },
	{ zeny: 2_740_000, copy: 10, material: 85 },
	// +11 upwards need enriched so multiply material by 5,
	{ zeny: 5_250_000, copy: 22, material: 27 * 5 },
	{ zeny: 9_000_000, copy: 30, material: 45 * 5 },
	{ zeny: 14_500_000, copy: 45, material: 75 * 5 },
	{ zeny: 24_500_000, copy: 69, material: 120 * 5 },
	{ zeny: 42_000_000, copy: 98, material: 180 * 5 },
];

export const calculate_safe_refine_range = ([from, to]: RefineRange) =>
	costs.slice(from, to).reduce(
		(acc, value) => ({
			zeny: acc.zeny + value.zeny,
			copy: acc.copy + value.copy,
			material: acc.material + value.material,
		}),
		{ zeny: 0, copy: 0, material: 0 }
	);

export const calculate_safe_refine_cost = (
	refine_range: RefineRange,
	{ apply_home_rating_discount, equipment, material_price }: SafeRefineOptions
) => {
	const { zeny, copy, material } = calculate_safe_refine_range(refine_range);

	return {
		zeny: apply_home_rating_discount ? zeny * 0.95 : zeny,
		copy,
		copy_zeny: copy * calculate_equipment_price(equipment),
		material,
		material_zeny: material * material_price,
	};
};

export const calculate_equipment_price = ({
	base_price,
	state,
}: SafeRefineOptions['equipment']) => {
	if (base_price === 0) return 0;
	else if (state === EquipmentState.Clean) return base_price;

	const refine_values = [35_000, 45_000, 55_000, 65_000];
	const total_refine_value = refine_values
		.slice(0, Object.values(EquipmentState).indexOf(state))
		.reduce((a, b) => a + b);

	return Math.ceil(base_price / 2) + total_refine_value;
};

export const get_table = (): TableData => {
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
			['Material', ...materials.map((material) => `${material} items`), `${sum(materials)} items`],
			['Zeny', ...zenies.map((zeny) => formatZeny(zeny)), formatZeny(sum(zenies))],
		],
	};
};
