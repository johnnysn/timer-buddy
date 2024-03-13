import type { Event } from './event';

export interface Activity {
	id: string;
	name: string;
	description: string;
	active: boolean;
	averageDuration?: number;
	events: Event[];
	activeEventStartedAt?: Date;
}
