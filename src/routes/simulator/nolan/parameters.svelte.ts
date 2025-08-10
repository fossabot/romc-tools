import { gacha_costs, gacha_names, type GachaItem, type GachaType } from '$lib/calc/card-gacha';
import { persistedParameters } from '$lib/utils';

export interface Parameters {
	gacha_type: GachaType;
	sort_pulls: boolean;
	pull_until_target?: GachaItem;
}

export const parameters = persistedParameters<Parameters>('nolan-simulator-parameters', {
	gacha_type: 'nolan',
	sort_pulls: true,
	pull_until_target: undefined,
});

const gacha_name = $derived(gacha_names[parameters.current.gacha_type]);
const gacha_cost = $derived(gacha_costs[parameters.current.gacha_type]);

export const computed = {
	get gacha_name() {
		return gacha_name;
	},
	get gacha_cost() {
		return gacha_cost;
	},
};
