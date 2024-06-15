import { z } from 'zod'

export const inputModel = z.object({
  entryId: z.string(),
  path: z.array(z.string()),
})

export type Input = z.infer<typeof inputModel>
