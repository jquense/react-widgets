import { useState } from 'react'
import useFocusManagerBase from '@restart/hooks/useFocusManager'

import { isInDisabledFieldset } from './interaction'

export default function useFocusManager(ref, props, opts = {}) {
  const [focused, setFocus] = useState(false)

  const events = useFocusManagerBase({
    ...opts,
    onChange: focused => {
      setFocus(focused)
    },
    isDisabled: () =>
      props.disabled === true || isInDisabledFieldset(ref.current),
    didHandle(focused, event) {
      let handler = props[focused ? 'onFocus' : 'onBlur']
      handler && handler(event)

      if (opts.didHandle && !event.isWidgetDefaultPrevented)
        opts.didHandle(focused, event)
    },
  })

  return [events, focused, setFocus]
}
