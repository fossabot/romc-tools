import { describe, expect, it } from 'vitest';

import { sum, transpose } from './utils';

describe('sum', () => {
	it('should sum numbers', () => {
		const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		expect(sum(a)).toBe(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10);
	});
});

describe('transpose', () => {
	it('should transpose 2d arrays', () => {
		expect(
			transpose([
				[1, 2, 3],
				[4, 5, 6],
			])
		).toStrictEqual([
			[1, 4],
			[2, 5],
			[3, 6],
		]);

		expect(
			transpose([
				[1, 4],
				[2, 5],
				[3, 6],
			])
		).toStrictEqual([
			[1, 2, 3],
			[4, 5, 6],
		]);
	});
});
