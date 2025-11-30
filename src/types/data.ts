export interface Sponsor {
	name: string;
	avatar?: string;
	date: string;
	amount: string;
}

export interface SponsorsData {
	sponsors: Sponsor[];
}
