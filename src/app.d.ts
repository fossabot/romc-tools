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

			data_id?: TableName;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
