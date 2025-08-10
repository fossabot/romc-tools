import type { GachaItem, GachaType } from '$lib/calc/card-gacha';
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
