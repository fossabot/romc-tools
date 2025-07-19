import { EquipmentState, type RefineRange, type SafeRefineOptions } from '$lib/calc/safe-refine';
import { persistedParameters } from '$lib/utils';

export interface Parameters {
	equipment: SafeRefineOptions['equipment'];

	options: {
		apply_home_rating_discount: boolean;
		exclude_material_cost: boolean;
	};

	refine_range: RefineRange;
}

export const parameters = persistedParameters<Parameters>('safe-refine-parameters', {
	equipment: { base_price: 750_000, state: EquipmentState.Broken3 },
	options: { apply_home_rating_discount: true, exclude_material_cost: false },
	refine_range: [6, 12],
});
