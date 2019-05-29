import { useRef } from 'react'

let idCount = 0
function uniqueId(prefix) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount)
}

export function notify(handler, args) {
  // eslint-disable-next-line babel/no-unused-expressions
  handler && handler.apply(null, [].concat(args))
}

export const useInstanceId = (otherId, suffix = '') => {
  const id = useRef(null)
  if (!id.current) id.current = uniqueId('rw_')
  return (otherId || id.current) + suffix
}

export function instanceId(component, suffix = '') {
  // eslint-disable-next-line babel/no-unused-expressions
  component.__id || (component.__id = uniqueId('rw_'))
  return (component.props.id || component.__id) + suffix
}

/**
 * Allows for defering popup rendering untill the widget is focused,
 * or has been opened (in order to not remove it suddenly on close)
 */
export function isFirstFocusedRender(component) {
  return (
    component._firstFocus ||
    ((component.state.focused || !!component.props.open) &&
      (component._firstFocus = true))
  )
}

export function useFirstFocusedRender(focused, open) {
  const ref = useRef(false)
  return ref.current || ((focused || !!open) && (ref.current = true))
}
