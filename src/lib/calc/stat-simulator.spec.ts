import { describe, expect, it } from 'vitest';

import { get_max_stat_possible, get_next_stat_cost, get_total_stat_cost } from './stat-simulator';

describe('get next stat cost formula', () => {
	it('should be correct', () => {
		expect(get_next_stat_cost(0)).toBe(2);
		expect(get_next_stat_cost(8)).toBe(2);

		expect(get_next_stat_cost(9)).toBe(3);
		expect(get_next_stat_cost(18)).toBe(3);

		expect(get_next_stat_cost(49)).toBe(7);
		expect(get_next_stat_cost(74)).toBe(9);
	});
});

describe('get total stat cost calculations', () => {
	it('should calculate correctly', () => {
		expect(get_total_stat_cost(0)).toBe(0);
		expect(get_total_stat_cost(1)).toBe(2);
		expect(get_total_stat_cost(9)).toBe(18);
		expect(get_total_stat_cost(10)).toBe(21);
		expect(get_total_stat_cost(24)).toBe(68);
		expect(get_total_stat_cost(47)).toBe(186);
		expect(get_total_stat_cost(99)).toBe(648);
	});
});

describe('get max stat possible calculations', () => {
	it('should calculate correctly', () => {
		expect(get_max_stat_possible(0, 3, 99)).toBe(1);
		expect(get_max_stat_possible(15, 455, 99)).toBe(84);
		expect(get_max_stat_possible(0, 293, 99)).toBe(62);
		expect(get_max_stat_possible(20, 3, 99)).toBe(20);
		expect(get_max_stat_possible(0, 999, 99)).toBe(99);
	});
});
