import { InheritanceQuality, type InheritanceRange } from '$lib/calc/skill-inheritance';
import { persistedParameters } from '$lib/utils';

export interface Parameters {
	quality: InheritanceQuality;
	level: InheritanceRange;
}

export const parameters = persistedParameters<Parameters>('safe-refine-parameters', {
	quality: InheritanceQuality.Rank2,
	level: [0, 5],
});
