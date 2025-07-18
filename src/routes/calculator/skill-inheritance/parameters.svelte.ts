import { InheritanceQuality, type InheritanceRange } from '$lib/calc/skill-inheritance';
import { persistedState } from 'svelte-persisted-state';

export interface Parameters {
	quality: InheritanceQuality;
	level: InheritanceRange;
}

const default_parameters: Parameters = {
	quality: InheritanceQuality.Rank2,
	level: [0, 5],
};

export const parameters = persistedState('safe-refine-parameters', default_parameters, {
	beforeRead: (existing) => ({ ...default_parameters, ...existing }), // ensure all parameters exists
});
