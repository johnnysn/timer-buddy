import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const planSchema = z.object({
	id: z.string(),
	name: z.string().max(40),
	description: z.string().max(255),
	active: z.boolean(),
	activities: z.array(
		z.object({
			id: z.string(),
			activityId: z.string()
		})
	),
	executions: z.array(
		z.object({
			start: z.string().transform((val) => new Date(val)),
			target: z.string().transform((val) => new Date(val)),
			end: z.optional(z.string().transform((val) => new Date(val)))
		})
	)
});

export const planFormSchema = zfd.formData(
	z.object({
		name: zfd.text(z.string().max(40)),
		description: zfd.text(z.string().max(255).optional())
	})
);
