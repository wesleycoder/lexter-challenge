import { ActionError, defineAction } from 'astro:actions'
import { z } from 'zod'
import { inputModel } from '~/models/input'
import { outputList, removeItem } from '~/stub/output'
import { transformInputs } from './transform'

export const server = {
  listItems: defineAction({
    handler: () => outputList,
  }),
  removeItem: defineAction({
    accept: 'form',
    input: z.object({ path: z.string() }),
    handler: ({ path: fullPath }) => {
      if (!fullPath.split('/').length) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Invalid path',
        })
      }

      try {
        removeItem(fullPath)
      } catch (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: (error as Error).message,
        })
      }

      return { success: true, error: null } as const
    },
  }),
  addItem: defineAction({
    accept: 'form',
    input: inputModel.extend({
      rootPath: z.string().optional(),
      path: z.string(),
    }),
    handler: (input, _ctx) => {
      if (!input.path) return outputList

      if (input.rootPath) {
        return transformInputs(
          [
            {
              ...input,
              path: [...input.rootPath.split('/'), input.path],
            },
          ],
          outputList,
        )
      }

      return transformInputs(
        [
          {
            ...input,
            path: [input.path],
          },
        ],
        outputList,
      )
    },
  }),
}
