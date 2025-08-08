import { sum } from '$lib/utils';

export const gacha_types = ['gram', 'nolan'] as const;
export type GachaType = (typeof gacha_types)[number];

export const gacha_names = {
	gram: 'MVP Card Crafting',
	nolan: 'Combined Fate',
} satisfies Record<GachaType, string>;

const tables = {
	gram: [
		['Angeling', 3.361],
		['Deviling', 3.361],
		['Strouf', 3.361],
		['Orc Lord', 3.361],
		['Detarderous', 3.361],
		['Kobold Leader', 3.361],
		['Dark Lord', 3.361],
		['Dracula', 3.361],
		['Time Holder', 3.361],
		['Garm', 3.361],
		['Stormy Knight', 3.361],
		['Firelord Kaho', 3.361],
		['Bloody Murderer', 3.361],
		['Wolf Grandma', 3.361],
		['Eremes', 3.361],
		['Valkyrie Rathgricy', 3.361],
		['Tesseract', 3.361],
		['Mentalist', 3.361],
		['Runemaster Thanatos', 3.361],
		['Ktullanux', 3.361],
		['Hill Wind', 3.361],
		['Gloom Under Night', 3.361],
		['Poi Tata', 3.361],
		['Wasteland Lord', 3.361],
		['Soul Player', 3.361],
		['Maya', 1.681],
		['Bloody Knight', 1.681],
		['Deeven', 1.681],
		['Snake Gorgon', 1.681],
		['Arc Angeling', 1.681],
		['Mistress', 0.84],
		['Atroce', 0.84],
		['Osiris', 0.84],
		['Doppelganger', 0.84],
		['Baphomet', 0.84],
		['Spashire', 0.84],
		['Golden Thief Bug', 0.84],
		['Katerina', 0.84],
		['Moonlight Flower', 0.168],
		['Drake', 0.336],
		['Orc Hero', 0.336],
	],
	nolan: [
		['Angeling', 0.833],
		['Deviling', 0.833],
		['Strouf', 0.833],
		['Orc Lord', 0.833],
		['Detarderous', 0.833],
		['Kobold Leader', 0.833],
		['Dark Lord', 0.833],
		['Dracula', 0.833],
		['Time Holder', 0.833],
		['Garm', 0.833],
		['Stormy Knight', 0.833],
		['Firelord Kaho', 0.833],
		['Bloody Murderer', 0.833],
		['Wolf Grandma', 0.833],
		['Eremes', 0.833],
		['Valkyrie Rathgricy', 0.833],
		['Tesseract', 0.833],
		['Mentalist', 0.833],
		['Runemaster Thanatos', 0.833],
		['Ktullanux', 0.833],
		['Hill Wind', 0.833],
		['Gloom Under Night', 0.833],
		['Poi Tata', 0.833],
		['Wasteland Lord', 0.833],
		['Soul Player', 0.833],
		['Maya', 0.417],
		['Bloody Knight', 0.417],
		['Deeven', 0.417],
		['Snake Gorgon', 0.417],
		['Arc Angeling', 0.417],
		['Goblin Leader', 0.208],
		['Mistress', 0.208],
		['Atroce', 0.208],
		['Osiris', 0.208],
		['Doppelganger', 0.208],
		['Baphomet', 0.208],
		['Spashire', 0.208],
		['Golden Thief Bug', 0.208],
		['Katerina', 0.208],
		['Moonlight Flower', 0.042],
		['Drake', 0.083],
		['Orc Hero', 0.083],
		['Vocal', 2.419],
		['Ghostring', 2.419],
		['Rotar Zairo', 2.419],
		['Wood Goblin', 2.419],
		['Gryphon', 2.419],
		['Orc Baby', 2.419],
		['Jakk', 2.419],
		['Mutant Dragonoid', 2.419],
		['Mysteltainn', 2.419],
		['Zherlthsh', 2.419],
		['Anubis', 2.419],
		['Hyegun', 2.419],
		['Clock', 2.419],
		['Clock Tower Manager', 2.419],
		['Rafflesia', 2.419],
		['Chepet', 2.419],
		['Loli Ruri', 2.419],
		['Cenia', 2.419],
		['Deje', 2.419],
		['Owl Duke', 2.419],
		['Toad', 2.419],
		['Eclipse', 2.419],
		['Vagabond Wolf', 2.419],
		['Gazeti', 2.419],
		['Fallen Bishop', 2.419],
		['Whitebait Lake Lord', 2.419],
		['Mao Guai Calvin', 2.419],
		['Maple Fairy Yzma', 2.419],
		['Fire Bird Chiri', 2.419],
		['Limunus', 2.419],
		['Gem Spirit', 2.419],
	],
} as const satisfies Record<GachaType, [string, number][]>;

export interface GachaItem {
	name: string;
	rate: number;
	cumulative_rate: number;
}

const preprocess_gacha_table = (table: (typeof tables)[GachaType]) => {
	const total_rate = sum(table.map(([_, rate]) => rate));

	return table.reduce<GachaItem[]>(
		(acc, [name, rate]) => [
			...acc,
			{ name, rate, cumulative_rate: (acc.at(-1)?.cumulative_rate ?? 0) + rate / total_rate },
		],
		[]
	);
};

export const gacha_table = {
	nolan: preprocess_gacha_table(tables.nolan),
	gram: preprocess_gacha_table(tables.gram),
};

export const pull_card = (type: GachaType) => {
	const random = Math.random();
	const pools = gacha_table[type];
	return pools.find(({ cumulative_rate }) => random < cumulative_rate) ?? pools.at(-1)!;
};
