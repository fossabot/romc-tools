import { describe, it, expect } from 'vitest';
import { calculate, costs, costs_array, type SafeRefineCost } from './safe-refine';

describe('safe refine costs data', () => {
	it('+1 to +15 data should be defined', () => {
		for (let idx = 1; idx <= 15; idx += 1) {
			// @ts-expect-error number from for loop ain't typed
			const cost = costs[idx] as SafeRefineCost;
			expect(cost.zeny).toBeTypeOf('number');
			expect(cost.copy).toBeTypeOf('number');
			expect(cost.material).toBeTypeOf('number');
		}
	});

	it('costs array elements should all be defined', () => {
		for (const cost of costs_array) {
			expect(cost.zeny).toBeTypeOf('number');
			expect(cost.copy).toBeTypeOf('number');
			expect(cost.material).toBeTypeOf('number');
		}
	});
});

describe('safe refine calculations', () => {
	it('should calculate +4 to +8 correctly', () => {
		const refine_5 = costs[5];
		const refine_6 = costs[6];
		const refine_7 = costs[7];
		const refine_8 = costs[8];

		const refine_4_to_8: SafeRefineCost = { zeny: 0, copy: 0, material: 0 };
		refine_4_to_8.zeny += refine_5.zeny + refine_6.zeny + refine_7.zeny + refine_8.zeny;
		refine_4_to_8.copy += refine_5.copy + refine_6.copy + refine_7.copy + refine_8.copy;
		refine_4_to_8.material +=
			refine_5.material + refine_6.material + refine_7.material + refine_8.material;

		expect(calculate(4, 8)).toEqual(refine_4_to_8);
	});
});
