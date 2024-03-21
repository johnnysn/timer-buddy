import { z } from 'zod';

export const planSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	active: z.boolean(),
	activities: z.array(
		z.object({
			id: z.string(),
			activityId: z.string()
		})
	)
});
