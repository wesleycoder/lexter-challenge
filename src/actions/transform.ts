import type { Input } from '~/models/input'
import type { Output } from '~/models/output'

const toOutput = (input: Input): Output => ({
  entryId: Number.parseInt(input.entryId, 10),
  currentPath: input.path.at(-1) ?? '',
  fullPath: input.path.join('/'),
  children: [],
})

export const transformInputs = (items: Input[], initialResult: Output[] = []): Output[] => {
  const result: Output[] = initialResult

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

if (import.meta.vitest) {
  const { ouptutModel } = await import('~/models/output')
  const { it, expect, describe } = import.meta.vitest
  describe('should create an output tree', () => {
    const inputs = [
      { entryId: '1', path: ['a'] },
      { entryId: '2', path: ['a', 'b'] },
      { entryId: '3', path: ['a', 'b', 'c'] },
    ]
    const expected = [
      {
        entryId: 1,
        currentPath: 'a',
        fullPath: 'a',
        children: [
          {
            entryId: 2,
            currentPath: 'b',
            fullPath: 'a/b',
            children: [
              {
                entryId: 3,
                currentPath: 'c',
                fullPath: 'a/b/c',
                children: [],
              },
            ],
          },
        ],
      },
    ]

    const actual = transformInputs(inputs)

    it('has valid output', () => {
      expect(() => actual.map((i) => ouptutModel.parse(i))).not.toThrow()
    })

    it('has expected output', () => {
      expect(actual).toEqual(expected)
    })
  })
}
