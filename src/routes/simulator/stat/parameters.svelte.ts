import type { StatName } from '$lib/calc/stat-simulator';
import { persistedState } from 'svelte-persisted-state';

export interface Parameters {
	allocations: Record<StatName, number>;
	available_points: number;
	max_stat: number;
}

const default_parameters: Parameters = {
	allocations: { STR: 0, AGI: 0, VIT: 0, INT: 0, DEX: 0, LUK: 0 },
	available_points: 1589, // lv. 110 points
	max_stat: 99, // lv. 110 max stat
};

export const parameters = persistedState('stat-simulator-parameters', default_parameters, {
	beforeRead: (existing) => ({ ...default_parameters, ...existing }), // ensure all parameters exists
});
