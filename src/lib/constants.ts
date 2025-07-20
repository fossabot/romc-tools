import { version } from '$app/environment';

export const GITHUB_REPOSITORY = 'https://github.com/ahmadyasser72/romc-tools';

export const VERSION = version.slice(0, 7);
export const SOURCE_CODE_URL = `${GITHUB_REPOSITORY}/tree/${version}`;
