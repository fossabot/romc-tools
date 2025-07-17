import { describe, it, expect } from 'vitest';
import { calculate_master_skill_cost, costs, MasterSkill } from './master-skill';
import { sum } from '$lib/utils';

describe('master skill cost data', () => {
	it('should be defined correctly', () => {
		expect(costs[MasterSkill.Active]).toHaveLength(10);
		costs[MasterSkill.Active].forEach((cost) => expect(cost).toBeTypeOf('number'));
		expect(costs[MasterSkill.Passive1]).toHaveLength(5);
		costs[MasterSkill.Passive1].forEach((cost) => expect(cost).toBeTypeOf('number'));
		expect(costs[MasterSkill.Passive2]).toHaveLength(5);
		costs[MasterSkill.Passive2].forEach((cost) => expect(cost).toBeTypeOf('number'));
		expect(costs[MasterSkill.Passive3]).toHaveLength(10);
		costs[MasterSkill.Passive3].forEach((cost) => expect(cost).toBeTypeOf('number'));
	});
});

describe('master skill calculations', () => {
	it('should calculate correctly', () => {
		const output = calculate_master_skill_cost({
			[MasterSkill.Active]: [3, 10],
			[MasterSkill.Passive1]: [1, 5],
			[MasterSkill.Passive2]: [2, 3],
			[MasterSkill.Passive3]: [5, 5],
		});

		expect(output[MasterSkill.Active]).toBe(sum(costs[MasterSkill.Active].slice(3, 10)));
		expect(output[MasterSkill.Passive1]).toBe(sum(costs[MasterSkill.Passive1].slice(1, 5)));
		expect(output[MasterSkill.Passive2]).toBe(sum(costs[MasterSkill.Passive2].slice(2, 3)));
		expect(output[MasterSkill.Passive3]).toBe(0);
	});

	it('should handle noop', () => {
		const noop = calculate_master_skill_cost({
			[MasterSkill.Active]: [5, 5],
			[MasterSkill.Passive1]: [2, 2],
			[MasterSkill.Passive2]: [0, 0],
			[MasterSkill.Passive3]: [3, 3],
		});

		Object.values(noop).forEach((cost) => {
			expect(cost).toBe(0);
		});
	});
});
