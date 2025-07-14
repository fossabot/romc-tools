import { describe, expect, it } from 'vitest';
import { sum } from './utils';

describe('sum', () => {
	it('should sum numbers', () => {
		const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		expect(sum(a)).toBe(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10);
	});
});
