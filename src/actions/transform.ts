import type { Input } from '~/models/input'
import type { Output } from '~/models/output'

const toOutput = (input: Input): Output => ({
  entryId: Number.parseInt(input.entryId, 10),
  currentPath: input.path.at(-1) ?? '',
  fullPath: input.path.join('/'),
  children: [],
})

export const transformInputs = (items: Input[]): Output[] => {
  const result: Output[] = []

  for (const input of items.sort((a, b) => a.path.length - b.path.length)) {
    const output = toOutput(input)

    let parent: Output | undefined

    for (const item of input.path.slice(0, -1)) {
      if (parent === undefined) {
        parent = result.find((r) => r.currentPath === item) ?? undefined
      } else {
        parent = parent.children.find((r) => r.currentPath === item) ?? undefined
      }
    }

    if (!parent) {
      result.push(output)
    } else {
      parent.children = [...parent.children, output].sort((a, b) => a.entryId - b.entryId)
    }
  }

  return result.sort((a, b) => a.entryId - b.entryId)
}
