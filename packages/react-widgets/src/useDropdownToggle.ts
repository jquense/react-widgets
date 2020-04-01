import { notify } from './WidgetHelpers'

export default function useDropdownToggle(
  isOpen: boolean | undefined,
  onToggle: (isOpen: boolean) => void,
) {
  function open() {
    if (!isOpen) notify(onToggle, [true])
  }
  function close() {
    if (isOpen) notify(onToggle, [false])
  }
  function toggle() {
    if (isOpen) close()
    else open()
  }

  toggle.open = open
  toggle.close = close
  return toggle
}
