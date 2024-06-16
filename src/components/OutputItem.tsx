import type { ParentProps } from 'solid-js'
import type { Output } from '~/models/output'

export const OutputItem = ({ item, children }: ParentProps<{ item: Output }>) => {
  return (
    <>
      {item.children.length > 0 ? (
        <details>
          <summary title={item.fullPath}>
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
        <div>
          <b>− #{item.entryId}</b> - {item.currentPath}
        </div>
      )}
    </>
  )
}
