let idCount = 0
function uniqueId(prefix) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount)
}

export function notify(handler, args) {
  handler && handler.apply(null, [].concat(args))
}

export function instanceId(component, suffix = '') {
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
