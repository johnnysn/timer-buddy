export interface Plan {
	id: string;
	name: string;
	description: string;
	activities: {
		id: string;
		activityId: string;
	}[];
	active: boolean;
	executions: PlanExecution[];
}

export interface PlanExecution {
	start: Date;
	target: Date;
	end?: Date;
	checkedActivities: string[];
}
