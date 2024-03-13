import z from 'zod';
import { eventSchema } from './event-schema';

export const activitySchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	active: z.boolean(),
	averageDuration: z.optional(z.number()),
	activeEventStartedAt: z.optional(z.string().transform((val) => new Date(val))),
	events: z.array(eventSchema)
});
