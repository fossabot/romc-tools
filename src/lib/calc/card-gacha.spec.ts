import { describe, expect, it, vi } from 'vitest';

import { sum } from '$lib/utils';

import { gacha_table, pull_card } from './card-gacha';

describe('gacha data', () => {
	it('should have approximately 100% rate in total', () => {
		for (const table of Object.values(gacha_table)) {
			const total_rate = sum(table.map(({ rate }) => rate));
			expect(total_rate).toBeGreaterThan(99.9);
			expect(total_rate).toBeLessThanOrEqual(100);
		}
	});
});

describe('gacha pull', () => {
	it('should always pull an item', () => {
		for (let i = 0; i < 10_000; i += 1) {
			expect(pull_card('gram')).toBeDefined();
			expect(pull_card('nolan')).toBeDefined();
		}
	});

	it('should be able to pull the last item', () => {
		vi.spyOn(Math, 'random').mockReturnValue(1);

		expect(pull_card('gram')).toStrictEqual(gacha_table['gram'].at(-1));
		expect(pull_card('nolan')).toStrictEqual(gacha_table['nolan'].at(-1));

		vi.spyOn(Math, 'random').mockRestore();
	});
});
