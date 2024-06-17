import { actions, getActionProps } from 'astro:actions'
import { createSignal, type ParentProps } from 'solid-js'
import type { Output } from '~/models/output'
import { Icon } from './Icons'
import './OutputItem.css'

type ItemHeaderProps = {
  item: Output
  onDelete: (path: Output) => void
}
const ItemHeader = ({ item, onDelete }: ItemHeaderProps) => {
  return (
    <>
      <span>
        <b>#{item.entryId}</b> - {item.currentPath}
      </span>
      <form method="post" class="flex gap-2 ml-auto">
        {item.children.length > 0 && (
          <>
            <span class="mr-2 icon icon-closed">▶</span>
            <span class="mr-2 icon icon-open">▼</span>
          </>
        )}
        <input {...getActionProps(actions.addItem)} />
        <input type="hidden" name="entryId" value={Math.floor(Math.random() * 1000)} />
        <input type="hidden" name="rootPath" value={item.fullPath} />
        <input type="text" name="path" placeholder="Child name" class="px-2 rounded text-foreground" />
        <button type="submit" class="self-stretch px-3 text-white rounded bg-opacity-70 backdrop-blur-sm bg-black/70">
          <Icon name="plus" />
        </button>
      </form>
      <button
        type="button"
        class="self-stretch px-3 text-white rounded bg-opacity-70 backdrop-blur-sm bg-black/70"
        onClick={() => onDelete(item)}
      >
        <Icon name="trash" />
      </button>
    </>
  )
}

type Props = ParentProps<{ item: Output }>
export const OutputItem = ({ item, children }: Props) => {
  let deleteDialogRef!: HTMLDialogElement
  const [deleteItem, setDeleteItem] = createSignal<Output | undefined>()
  const onDelete = (item: Output) => {
    setDeleteItem(item)
    deleteDialogRef.showModal()
  }

  return (
    <>
      <dialog ref={deleteDialogRef} class="p-4 rounded-sm shadow-2xl pointer-events-none">
        <div class="flex flex-col items-center text-center pointer-events-auto">
          <h1>Delete {deleteItem()?.entryId}?</h1>
          <p>
            Are you sure you want to delete the item at `{deleteItem()?.fullPath}`?
            <br />
            Any children will also be deleted.
          </p>
          <p class="text-red-500 underline">This action cannot be undone!</p>
          <form method="post" class="flex gap-2">
            <input {...getActionProps(actions.removeItem)} />
            <input type="hidden" name="path" value={deleteItem()?.fullPath} />
            <button
              autofocus
              type="button"
              class="p-2 px-4 border border-black rounded outline-offset-1 focus:outline"
              onClick={() => deleteDialogRef.close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded bg-red-500/70 outline-red-500/70 outline-offset-1 focus:outline"
            >
              Delete
            </button>
          </form>
        </div>
      </dialog>
      {item.children.length > 0 ? (
        <details class="output-item">
          <summary
            title={item.fullPath}
            class={[
              'flex items-center gap-2 p-2 border-b border-neutral-900 hover:cursor-pointer header',
              'bg-opacity-30 hover:bg-opacity-50',
            ].join(' ')}
          >
            <ItemHeader item={item} onDelete={onDelete} />
          </summary>
          {children}
          <div class="ml-4">
            {item.children.map((child) => (
              <OutputItem item={child} />
            ))}
          </div>
        </details>
      ) : (
        <div
          title={item.fullPath}
          class={[
            'flex justify-between gap-2',
            'output-item p-2 border-b border-neutral-900  bg-opacity-30 hover:bg-opacity-50',
          ].join(' ')}
        >
          <ItemHeader item={item} onDelete={onDelete} />
        </div>
      )}
    </>
  )
}
