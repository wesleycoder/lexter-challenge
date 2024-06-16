import { createSignal } from 'solid-js'

export const PathInputs = () => {
  const [items, setItems] = createSignal<string[]>([''])
  const addItem = (item: string) => setItems(items().concat(item))
  const removeItem = (index: number) => setItems(items().filter((_, i) => i !== index))
  const updateItem = (index: number, value: string) => setItems(items().map((item, i) => (i === index ? value : item)))

  return (
    <>
      {items().map((item, i) => (
        <div class="block">
          <input
            type="text"
            name="path"
            placeholder={`Path ${i + 1}`}
            onChange={(e) => updateItem(i, e.target.value)}
            value={item}
          />
          <button type="button" onClick={() => addItem('')}>
            ➕
          </button>
          <button type="button" onClick={() => removeItem(i)}>
            🗑️
          </button>
        </div>
      ))}
    </>
  )
}
