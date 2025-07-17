import { EquipmentState, type RefineRange, type SafeRefineOptions } from '$lib/calc/safe-refine';
import { persistedState } from 'svelte-persisted-state';

export interface Parameters {
	equipment: SafeRefineOptions['equipment'];

	options: {
		apply_home_rating_discount: boolean;
		exclude_material_cost: boolean;
	};

	refine_range: RefineRange;
}

const default_parameters: Parameters = {
	equipment: { base_price: 300_000, state: EquipmentState.Clean },
	options: { apply_home_rating_discount: false, exclude_material_cost: false },
	refine_range: [8, 12],
};

export const parameters = persistedState('safe-refine-parameters', default_parameters, {
	beforeRead: (existing) => ({ ...default_parameters, ...existing }), // ensure all parameters exists
});
