export const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
    <title>plus sign</title>
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M8 2.75a.5.5 0 0 0-1 0V7H2.75a.5.5 0 0 0 0 1H7v4.25a.5.5 0 0 0 1 0V8h4.25a.5.5 0 0 0 0-1H8z"
      clip-rule="evenodd"
    />
  </svg>
)

export const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
    <title>trash</title>
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M5.5 1a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zM3 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H11v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4h-.5a.5.5 0 0 1-.5-.5M5 4h5v8H5z"
      clip-rule="evenodd"
    />
  </svg>
)

export const iconMap = {
  plus: PlusIcon,
  trash: TrashIcon,
} as const

export const Icon = ({ name }: { name: keyof typeof iconMap }) => iconMap[name]() ?? null
