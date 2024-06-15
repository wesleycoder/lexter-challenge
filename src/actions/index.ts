import { defineAction } from 'astro:actions'
import { inputModel } from '~/models/input'
import { transformInputs } from './transform'

export const server = {
  transformInputs: defineAction({
    input: inputModel.array(),
    handler: (input, _ctx) => {
      return transformInputs(input)
    },
  }),
}
