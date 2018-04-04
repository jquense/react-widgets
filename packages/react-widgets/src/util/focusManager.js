import { focusManager } from 'react-component-managers'

import { isInDisabledFieldset } from './interaction'

export default function createFocusManager(inst, options) {
  const didHandle = options.didHandle

  return focusManager(inst, {
    ...options,
    onChange: focused => {
      inst.setState({ focused })
    },
    isDisabled: () =>
      inst.props.disabled === true || isInDisabledFieldset(inst),
    didHandle(focused, event) {
      let handler = this.props[focused ? 'onFocus' : 'onBlur']
      handler && handler(event)

      if (didHandle && !event.isWidgetDefaultPrevented)
        didHandle(focused, event)
    },
  })
}
