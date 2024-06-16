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
      <input type="text" name="path" placeholder="Child name" class="px-2" />
      <button type="submit">➕</button>
    </form>
  </>
)

type Props = ParentProps<{
  item: Output
  odd: boolean
}>
export const OutputItem = ({ item, odd, children }: Props) => {
  return (
    <>
      {item.children.length > 0 ? (
        <details class="output-item">
          <summary
            title={item.fullPath}
            class={[
              'flex items-center gap-2 p-2 border-b border-neutral-900 hover:cursor-pointer header',
              'bg-opacity-30 hover:bg-opacity-50',
              odd ? 'bg-green-500' : 'bg-yellow-500',
            ].join(' ')}
          >
            <ItemHeader item={item} />
          </summary>
          {children}
          <div class="ml-4">
            {item.children.map((child, i) => (
              <OutputItem item={child} odd={(+odd + i) % 2 === 0} />
            ))}
          </div>
        </details>
      ) : (
        <div
          title={item.fullPath}
          class={[
            'flex justify-between gap-2',
            'output-item p-2 border-b border-neutral-900  bg-opacity-30 hover:bg-opacity-50',
            odd ? 'bg-green-500' : 'bg-yellow-500',
          ].join(' ')}
        >
          <ItemHeader item={item} />
        </div>
      )}
    </>
  )
}
