import { clsx, type ClassValue } from 'clsx';
import { persistedState } from 'svelte-persisted-state';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const numberFormat = Intl.NumberFormat('en-US');
export const formatZeny = (zeny: number) => `${numberFormat.format(zeny)}z`;
export const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

export const persistedParameters = <T extends object>(name: string, default_parameters: T) =>
	persistedState(name, default_parameters, {
		// ensure all parameters exists
		beforeRead: (parameters) => ({ ...default_parameters, ...parameters }),
		beforeWrite: (parameters) => {
			// delete all unknown values
			for (const key in parameters) if (!(key in default_parameters)) delete parameters[key];

			return parameters;
		},
	});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
