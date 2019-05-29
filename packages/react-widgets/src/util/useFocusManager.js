import { useState } from 'react'
import useMounted from '@restart/hooks/useMounted'
import useFocusManagerBase from '@restart/hooks/useFocusManager'

import { isInDisabledFieldset } from './interaction'

export default function useFocusManager(ref, props, opts = {}) {
  const isMounted = useMounted()
  const [focused, setFocus] = useState(false)

  const events = useFocusManagerBase({
    ...opts,
    onChange: focused => {
      if (isMounted()) setFocus(focused)
    },
    isDisabled: () =>
      props.disabled === true || isInDisabledFieldset(ref.current),
    didHandle(focused, event) {
      let handler = props[focused ? 'onFocus' : 'onBlur']
      if (handler) handler(event)

      if (opts.didHandle && !event.isWidgetDefaultPrevented)
        opts.didHandle(focused, event)
    },
  })

  return [events, focused, setFocus]
}
