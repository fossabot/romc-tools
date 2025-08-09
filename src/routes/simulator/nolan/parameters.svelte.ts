import type { GachaType } from '$lib/calc/card-gacha';
import { persistedParameters } from '$lib/utils';

export interface Parameters {
	gacha_type: GachaType;
	sort_pulls: boolean;
}

export const parameters = persistedParameters<Parameters>('nolan-simulator-parameters', {
	gacha_type: 'nolan',
	sort_pulls: true,
});
