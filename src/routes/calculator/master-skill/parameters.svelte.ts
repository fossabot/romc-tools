import { MasterSkill, type MasterSkillLevel } from '$lib/calc/master-skill';
import { persistedState } from 'svelte-persisted-state';

export interface Parameters {
	levels: MasterSkillLevel;
}

const default_parameters: Parameters = {
	levels: {
		[MasterSkill.Active]: [0, 10],
		[MasterSkill.Passive1]: [0, 5],
		[MasterSkill.Passive2]: [0, 5],
		[MasterSkill.Passive3]: [0, 10],
	},
};

export const parameters = persistedState('master-skill-parameters', default_parameters, {
	beforeRead: (existing) => ({ ...default_parameters, ...existing }), // ensure all parameters exists
});
