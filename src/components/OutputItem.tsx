import { actions, getActionProps } from 'astro:actions'
import type { ParentProps } from 'solid-js'
import type { Output } from '~/models/output'
import './OutputItem.css'

type ItemHeaderProps = {
  item: Output
}
const ItemHeader = ({ item }: ItemHeaderProps) => (
  <>
    <span>
      <b>#{item.entryId}</b> - {item.currentPath}
    </span>
    <form method="post" class="flex gap-2 ml-auto text-foreground">
      {item.children.length > 0 && (
        <>
          <span class="mr-2 icon icon-closed">▶</span>
          <span class="mr-2 icon icon-open">▼</span>
        </>
      )}
      <input {...getActionProps(actions.addItem)} />
      <input type="hidden" name="entryId" value={Math.floor(Math.random() * 1000)} />
      <input type="hidden" name="rootPath" value={item.fullPath} />
      <input type="text" name="path" placeholder="Path name" />
      <button type="submit">➕</button>
    </form>
  </>
)

type Props = ParentProps<{
  item: Output
}>
export const OutputItem = ({ item, children }: Props) => {
  return (
    <>
      {item.children.length > 0 ? (
        <details class="output-item">
          <summary
            title={item.fullPath}
            class="flex items-center gap-2 p-2 border-b border-neutral-900 hover:cursor-pointer header"
          >
            <ItemHeader item={item} />
          </summary>
          {children}
          <div class="ml-4">
            {item.children.map((child) => (
              <OutputItem item={child} />
            ))}
          </div>
        </details>
      ) : (
        <div class="output-item">
          <div title={item.fullPath} class="flex justify-between gap-2 p-2 border-b border-neutral-900 header">
            <ItemHeader item={item} />
          </div>
        </div>
      )}
    </>
  )
}
