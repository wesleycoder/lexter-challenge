import { z } from 'zod'

export interface OutputRef {
  entryId: number
  fullPath: string
  currentPath: string
  children: OutputRef[]
}

const baseOutputModel = z.object({
  entryId: z.number(),
  fullPath: z.string(),
  currentPath: z.string(),
})

export type Output = z.infer<typeof baseOutputModel> & {
  children: Output[]
}

export const ouptutModel: z.ZodType<Output> = baseOutputModel.extend({
  children: z.lazy(() => ouptutModel.array()),
})
