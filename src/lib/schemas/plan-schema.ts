import { z } from "zod";

export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  active: z.boolean(),
  activitiesIds: z.array(z.string())
});