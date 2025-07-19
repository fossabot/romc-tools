import { MasterSkill, type MasterSkillLevel } from '$lib/calc/master-skill';
import { persistedParameters } from '$lib/utils';

export interface Parameters {
	levels: MasterSkillLevel;
}

export const parameters = persistedParameters<Parameters>('master-skill-parameters', {
	levels: {
		[MasterSkill.Active]: [0, 5],
		[MasterSkill.Passive1]: [0, 5],
		[MasterSkill.Passive2]: [0, 5],
		[MasterSkill.Passive3]: [0, 5],
	},
});
