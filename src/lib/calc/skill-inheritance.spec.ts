import { describe, expect, it } from 'vitest';

import { costs, InheritanceQuality } from './skill-inheritance';

describe('skill inheritance cost data', () => {
	it('should be defined correctly', () => {
		expect(costs[InheritanceQuality.Rank1]).toHaveLength(10);
		costs[InheritanceQuality.Rank1].forEach((it) => expect(it).toBeTypeOf('number'));
		expect(costs[InheritanceQuality.Rank2]).toHaveLength(10);
		costs[InheritanceQuality.Rank2].forEach((it) => expect(it).toBeTypeOf('number'));
		expect(costs[InheritanceQuality.Rank3]).toHaveLength(10);
		costs[InheritanceQuality.Rank3].forEach((it) => expect(it).toBeTypeOf('number'));
	});
});
