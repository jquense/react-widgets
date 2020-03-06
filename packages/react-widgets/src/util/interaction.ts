import matches from 'dom-helpers/matches'
import { useCallback } from 'react'
import useEventCallback from '@restart/hooks/useEventCallback'

type DefaultFn = (...args: any[]) => any

export const isInDisabledFieldset = (node: Element) => {
  return !!node && matches(node, 'fieldset[disabled] *')
}

function createCallback<T extends DefaultFn>(
  disabled: boolean | undefined,
  ref: React.RefObject<Element>,
  fn: T,
) {
  return useEventCallback((...args) => {
    const inDisabledFieldset = ref.current && isInDisabledFieldset(ref.current)

    if (inDisabledFieldset || disabled == true) return
    return fn(...args)
  })
}

type UseEditableCallback = <T extends (...args: any[]) => any>(callback: T) => T

export const createEditableCallback = (
  disabled: boolean | undefined,
  ref: React.RefObject<Element>,
): UseEditableCallback => {
  return useCallback(
    function<T extends DefaultFn>(fn: T) {
      return createCallback(disabled, ref, fn)
    },
    [disabled, ref],
  ) as any
}
