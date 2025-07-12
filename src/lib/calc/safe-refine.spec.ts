import { describe, it, expect } from 'vitest';
import {
	calculate_safe_refine,
	calculate_equipment_price,
	costs,
	costs_array,
	EquipmentState,
	type SafeRefineCost,
} from './safe-refine';

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

		expect(calculate_safe_refine(4, 8)).toEqual(refine_4_to_8);
	});

	it('should properly handle noop (same refine_from and refine_to)', () => {
		const result_0 = calculate_safe_refine(0, 0);
		expect(result_0.zeny).toBe(0);
		expect(result_0.copy).toBe(0);
		expect(result_0.material).toBe(0);

		const result_12 = calculate_safe_refine(12, 12);
		expect(result_12.zeny).toBe(0);
		expect(result_12.copy).toBe(0);
		expect(result_12.material).toBe(0);
	});
});

describe('equipment price calculations', () => {
	it('should calculate correctly', () => {
		const base_prices = [67_915, 300_000, 750_000, 855_445, 1_591_604];
		const broken_1s = [68_958, 185_000, 410_000, 462_723, 830_802];
		const broken_2s = [113_958, 230_000, 455_000, 507_723, 875_802];
		const broken_3s = [168_958, 285_000, 510_000, 562_723, 930_802];
		const broken_4s = [233_958, 350_000, 575_000, 627_723, 995_802];

		for (let idx = 0; idx < base_prices.length; idx += 1) {
			const base_price = base_prices[idx];
			const broken_1 = broken_1s[idx];
			const broken_2 = broken_2s[idx];
			const broken_3 = broken_3s[idx];
			const broken_4 = broken_4s[idx];

			expect(calculate_equipment_price(base_price, EquipmentState['Broken +1'])).toBe(broken_1);
			expect(calculate_equipment_price(base_price, EquipmentState['Broken +2'])).toBe(broken_2);
			expect(calculate_equipment_price(base_price, EquipmentState['Broken +3'])).toBe(broken_3);
			expect(calculate_equipment_price(base_price, EquipmentState['Broken +4'])).toBe(broken_4);
		}
	});

	it('should handle clean state', () => {
		const base_price = 500_000;
		const clean = calculate_equipment_price(base_price, EquipmentState.Clean);
		expect(clean).toBe(base_price);
	});

	it('should properly handle noop (0 equipment price)', () => {
		const clean = calculate_equipment_price(0, EquipmentState.Clean);
		expect(clean).toBe(0);

		const broken = calculate_equipment_price(0, EquipmentState['Broken +3']);
		expect(broken).toBe(0);
	});
});
