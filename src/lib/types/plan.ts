export interface Plan {
	id: string;
	name: string;
	description: string;
	activities: {
		id: string;
		activityId: string;
	}[];
	active: boolean;
}
