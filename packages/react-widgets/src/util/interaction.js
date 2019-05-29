import { useRef } from 'react'
import useEventCallback from '@restart/hooks/useEventCallback'

import matches from 'dom-helpers/query/matches'

export const isInDisabledFieldset = node => {
  return !!node && matches(node, 'fieldset[disabled] *')
}

function createCallback(disabled, ref, fn) {
  return useEventCallback((...args) => {
    const inDisabledFieldset = ref.current && isInDisabledFieldset(ref.current)

    if (inDisabledFieldset || disabled == true) return
    return fn(...args)
  })
}

export const createEditableCallback = (...args) => {
  const ref = useRef(fn => createCallback(...args, fn))
  return ref.current
}
