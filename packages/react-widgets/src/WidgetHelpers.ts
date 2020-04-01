import { useRef } from 'react'

let idCount = 0
function uniqueId(prefix?: string) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount)
}

export function notify<T extends (...args: any) => any>(
  handler: T | undefined,
  args: Parameters<T>,
) {
  // eslint-disable-next-line prefer-spread
  if (handler) handler.apply(null, args)
}

export const useInstanceId = (otherId?: string, suffix = '') => {
  const id = useRef<string>()
  if (!id.current) id.current = uniqueId('rw_')
  return (otherId || id.current) + suffix
}

/**
 * Allows for defering popup rendering untill the widget is focused,
 * or has been opened (in order to not remove it suddenly on close)
 */
export function useFirstFocusedRender(focused: boolean, open: boolean) {
  const ref = useRef(false)
  return ref.current || ((focused || !!open) && (ref.current = true))
}
