// See https://svelte.dev/docs/kit/types#app.d.ts
import type { TableName } from '$lib/tables';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			title?: string;
			description?: string;

			table_id?: TableName | 'override';
		}
		interface PageState {
			table_id_override?: TableName;
		}
		// interface Platform {}
	}
}

export {};
