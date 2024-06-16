import type { ParentProps } from 'solid-js'
import type { Output } from '~/models/output'

type Props = ParentProps<{
  item: Output
}>
export const OutputItem = ({ item, children }: Props) => {
  return (
    <>
      {item.children.length > 0 ? (
        <details>
          <summary title={item.fullPath} class="bg-green-50/50 hover:cursor-pointer">
            <b>#{item.entryId}</b> - {item.currentPath}
          </summary>
          {children}
          <div class="ml-4">
            {item.children.map((child) => (
              <OutputItem item={child} />
            ))}
          </div>
        </details>
      ) : (
        <div title={item.fullPath}>
          <b>− #{item.entryId}</b> - {item.currentPath}
        </div>
      )}
    </>
  )
}
