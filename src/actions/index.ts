import { defineAction } from 'astro:actions'
import { inputModel } from '~/models/input'
import { outputList } from '~/stub/output'
import { transformInputs } from './transform'

export const server = {
  transformInputs: defineAction({
    accept: 'form',
    input: inputModel,
    handler: (input, _ctx) => {
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
