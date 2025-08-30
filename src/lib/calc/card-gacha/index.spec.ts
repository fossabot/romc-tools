import { describe, expect, it, vi } from 'vitest';

import { sum } from '$lib/utils';

import { gacha_table, pull_card } from '.';
import gram_table from './table-gram.csv';
import nolan_table from './table-nolan.csv';

describe('gacha data', () => {
	const tables = [
		['gram', gram_table],
		['nolan', nolan_table],
	] as const;

	for (const [name, raw_table] of tables) {
		it(`${name} table should be defined correctly`, () => {
			for (const row of raw_table) {
				expect(row.name).toBeTypeOf('string');
				expect(Number(row.rate)).not.toBeNaN();
			}
		});
	}

	it('should have approximately 100% rate in total', () => {
		for (const [name, table] of Object.entries(gacha_table)) {
			const total_rate = sum(table.map(({ rate }) => rate));
			expect(total_rate, `${name} table`).toBeCloseTo(100, 1);
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
