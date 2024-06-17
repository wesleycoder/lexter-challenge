import type { Output } from '~/models/output'

export const outputList: Output[] = [
  {
    entryId: 1,
    fullPath: 'root1',
    currentPath: 'root1',
    children: [
      {
        entryId: 6,
        fullPath: 'root1/path1',
        currentPath: 'path1',
        children: [
          {
            entryId: 17,
            fullPath: 'root1/path1/path1',
            currentPath: 'path1',
            children: [],
          },
        ],
      },
      {
        entryId: 7,
        fullPath: 'root1/path2',
        currentPath: 'path2',
        children: [],
      },
      {
        entryId: 8,
        fullPath: 'root1/path3',
        currentPath: 'path3',
        children: [],
      },
    ],
  },
  {
    entryId: 2,
    fullPath: 'root2',
    currentPath: 'root2',
    children: [
      {
        entryId: 9,
        fullPath: 'root2/path1',
        currentPath: 'path1',
        children: [],
      },
      {
        entryId: 10,
        fullPath: 'root2/path2',
        currentPath: 'path2',
        children: [
          {
            entryId: 19,
            fullPath: 'root2/path2/path1',
            currentPath: 'path1',
            children: [
              {
                entryId: 20,
                fullPath: 'root2/path2/path1/path1',
                currentPath: 'path1',
                children: [],
              },
            ],
          },
          {
            entryId: 21,
            fullPath: 'root2/path2/path2',
            currentPath: 'path2',
            children: [],
          },
        ],
      },
      {
        entryId: 11,
        fullPath: 'root2/path3',
        currentPath: 'path3',
        children: [],
      },
    ],
  },
  {
    entryId: 3,
    fullPath: 'root3',
    currentPath: 'root3',
    children: [
      {
        entryId: 12,
        fullPath: 'root3/path1',
        currentPath: 'path1',
        children: [],
      },
      {
        entryId: 13,
        fullPath: 'root3/path2',
        currentPath: 'path2',
        children: [],
      },
      {
        entryId: 14,
        fullPath: 'root3/path3',
        currentPath: 'path3',
        children: [],
      },
    ],
  },
]

export const removeItem = (fullPath: string, list: Output[] = outputList) => {
  const paths = fullPath.split('/')

  if (!paths.length) throw new Error('invalid path')

  if (paths.length === 1) {
    const itemIndex = list.findIndex((i) => i.currentPath === fullPath)
    list.splice(itemIndex, 1)
    return list
  }

  const lastPath = paths.pop()
  const rootPath = paths.shift()
  const root = list.find((i) => i.currentPath === rootPath)
  const parent = paths.reduce((target, path) => target?.children.find((t) => t.currentPath === path), root) ?? root

  if (!parent) throw new Error('invalid path')

  const itemIndex = parent.children.findIndex((i) => i.currentPath === lastPath)
  parent.children.splice(itemIndex, 1)

  return list
}
