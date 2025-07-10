export interface SafeRefineCost {
	/** The zeny cost */
	zeny: number;
	/** How many equipment copies needed */
	copy: number;
	/** How many refine material (oridecon, elunium, mithril) needed */
	material: number;
}

export const costs = {
	1: { zeny: 10_000, copy: 0, material: 1 },
	2: { zeny: 20_000, copy: 0, material: 1 },
	3: { zeny: 30_000, copy: 0, material: 1 },
	4: { zeny: 40_000, copy: 0, material: 1 },
	5: { zeny: 100_000, copy: 1, material: 5 },
	6: { zeny: 220_000, copy: 2, material: 10 },
	7: { zeny: 470_000, copy: 3, material: 15 },
	8: { zeny: 910_000, copy: 4, material: 25 },
	9: { zeny: 1_630_000, copy: 6, material: 50 },
	10: { zeny: 2_740_000, copy: 10, material: 85 },
	// +11 upwards need enriched so multiply material by 5
	11: { zeny: 5_250_000, copy: 22, material: 27 * 5 },
	12: { zeny: 9_000_000, copy: 30, material: 45 * 5 },
	13: { zeny: 14_500_000, copy: 45, material: 75 * 5 },
	14: { zeny: 24_500_000, copy: 69, material: 120 * 5 },
	15: { zeny: 42_000_000, copy: 98, material: 180 * 5 },
} satisfies Record<number, SafeRefineCost>;

export type RefineRange = 0 | keyof typeof costs;
export const costs_array = Array.from<SafeRefineCost>({
	...costs,
	length: Object.keys(costs).length + 1, // +1 since costs array object start at index 1
} as const).slice(1); // skip the first (refine +0) element since its empty

export const calculate = (from: RefineRange, to: RefineRange) =>
	costs_array.slice(from, to).reduce(
		(acc, value) => ({
			zeny: acc.zeny + value.zeny,
			copy: acc.copy + value.copy,
			material: acc.material + value.material,
		}),
		{ zeny: 0, copy: 0, material: 0 }
	);
