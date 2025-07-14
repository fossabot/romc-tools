import { describe, it, expect } from 'vitest';
import { calculate_master_skill_cost, costs, MasterSkill } from './master-skill';
import { sum } from '$lib/utils';

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
});
