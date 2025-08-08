import type { GachaType } from '$lib/calc/card-gacha';
import { persistedParameters } from '$lib/utils';

export interface Parameters {
	gacha_type: GachaType;
}

export const parameters = persistedParameters<Parameters>('nolan-simulator-parameters', {
	gacha_type: 'nolan',
});
