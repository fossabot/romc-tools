export const table_lookup = {
	'master-skill': () => import('$lib/calc/master-skill'),
	'safe-refine': () => import('$lib/calc/safe-refine'),
	'skill-inheritance': () => import('$lib/calc/skill-inheritance'),
};

export type TableName = keyof typeof table_lookup;

export interface TableData {
	caption: string;
	rows: string[][];
}
