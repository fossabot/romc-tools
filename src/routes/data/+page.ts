import { WEBSITE_NAME } from '$lib/constants';

import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	title: 'View data',
	description: `Data used for ${WEBSITE_NAME}`,
});
