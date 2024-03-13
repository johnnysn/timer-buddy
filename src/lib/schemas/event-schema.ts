import z from 'zod';

export const eventSchema = z.object({
	id: z.string(),
	start: z.string().transform((v) => new Date(v)),
	end: z.optional(z.string().transform((v) => new Date(v)))
});
