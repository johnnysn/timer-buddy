import z from 'zod';
import { eventSchema } from './event-schema';
import { zfd } from 'zod-form-data';

export const activitySchema = z.object({
	id: z.string(),
	name: z.string().max(40),
	description: z.string().max(255),
	active: z.boolean(),
	averageDuration: z.optional(z.number()),
	activeEventStartedAt: z.optional(z.string().transform((val) => new Date(val))),
	events: z.array(eventSchema)
});

export const activityFormSchema = zfd.formData(
	z.object({
		name: zfd.text(z.string().max(40)),
		description: zfd.text(z.string().max(255).optional())
	})
);
