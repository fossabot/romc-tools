import { table_lookup, type TableName } from '$lib/data';

import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const table = url.searchParams.get('t') ?? url.searchParams.get('table') ?? '';

	return {
		title: 'Raw data',
		description: 'Data used for ROMC Tools',
		table: table in table_lookup ? (table as TableName) : undefined,
	};
};
