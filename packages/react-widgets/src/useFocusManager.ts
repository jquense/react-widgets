import { useState } from 'react'
import useFocusManagerBase, {
  FocusManagerOptions,
} from '@restart/hooks/useFocusManager'
import useMounted from '@restart/hooks/useMounted'
import matches from 'dom-helpers/matches'

interface Props {
  disabled?: boolean
  onBlur?: React.FocusEventHandler
  onFocus?: React.FocusEventHandler
}

const isInDisabledFieldset = (node: Element) => {
  return !!node && matches(node, 'fieldset[disabled] *')
}

export default function useFocusManager(
  ref: React.RefObject<Element>,
  props: Props = {},
  opts: Omit<FocusManagerOptions, 'onChange' | 'isDisabled'> = {},
) {
  const isMounted = useMounted()
  const [focused, setFocus] = useState(false)

  const events = useFocusManagerBase({
    ...opts,
    onChange: focused => {
      if (isMounted()) setFocus(focused)
    },
    isDisabled: () =>
      props.disabled === true || isInDisabledFieldset(ref.current!),
    didHandle(focused, event) {
      let handler = props[focused ? 'onFocus' : 'onBlur']
      if (handler) handler(event)
      // @ts-ignore used by work
      if (opts.didHandle && !event.isWidgetDefaultPrevented)
        opts.didHandle(focused, event)
    },
  })

  return [events, focused, setFocus] as const
}
