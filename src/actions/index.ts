import { defineAction } from 'astro:actions'
import { inputModel } from '~/models/input'
import { outputList } from '~/stub/output'
import { transformInputs } from './transform'

export const server = {
  listOutputs: defineAction({
    handler: () => outputList,
  }),
  transformInputs: defineAction({
    accept: 'form',
    input: inputModel,
    handler: (input, _ctx) => {
      if (!input.path.filter(Boolean).length) {
        return outputList
      }
      return transformInputs(
        [
          {
            ...input,
            path: input.path.filter(Boolean),
          },
        ],
        outputList,
      )
    },
  }),
}
