import { EquipmentState, type RefineRange } from '$lib/calc/safe-refine';
import { persistedState } from 'svelte-persisted-state';

export interface Parameters {
	equipment: {
		base_price: number;
		state: EquipmentState;
	};

	refine_range: [RefineRange, RefineRange];
}

export const parameters = persistedState<Parameters>('safe-refine-parameters', {
	equipment: { base_price: 300_000, state: EquipmentState.Clean },
	refine_range: [8, 12],
});
