import type { StatName } from '$lib/calc/stat-simulator';
import { persistedParameters } from '$lib/utils';

export interface Parameters {
	allocations: Record<StatName, number>;
	available_points: number;
	max_stat: number;
}

export const parameters = persistedParameters<Parameters>('stat-simulator-parameters', {
	allocations: { STR: 0, AGI: 0, VIT: 0, INT: 0, DEX: 0, LUK: 0 },
	available_points: 1589, // lv. 110 points
	max_stat: 99, // lv. 110 max stat
});
