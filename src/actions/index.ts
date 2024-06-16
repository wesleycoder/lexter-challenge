import { defineAction } from 'astro:actions'
import { z } from 'zod'
import { inputModel } from '~/models/input'
import { outputList } from '~/stub/output'
import { transformInputs } from './transform'

export const server = {
  listItems: defineAction({
    handler: () => outputList,
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
