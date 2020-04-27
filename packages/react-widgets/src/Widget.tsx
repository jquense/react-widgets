import cn from 'classnames'
import React, { useState } from 'react'
import useGlobalListener from '@restart/hooks/useGlobalListener'

export interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  focused?: boolean
  open?: boolean
  dropUp?: boolean
  autofilling?: boolean
  disabled?: boolean
  readOnly?: boolean
}

function useKeyboardNavigationCheck() {
  const [isNavigatingViaKeyboard, setIsNavigatingViaKeyboard] = useState(false)
  useGlobalListener('keydown', ({ key }) => {
    if (
      key == ' ' ||
      key === 'Tab' ||
      key == 'Enter' ||
      key.indexOf('Arrow') !== -1
    ) {
      setIsNavigatingViaKeyboard(true)
    }
  })

  // TODO: use pointerdown
  useGlobalListener('mousedown', () => {
    setIsNavigatingViaKeyboard(false)
  })

  return isNavigatingViaKeyboard
}

export function useWidgetProps(props: WidgetProps) {
  const tabIndex = props.tabIndex != null ? props.tabIndex : -1
  const isKeyboardNavigating = useKeyboardNavigationCheck()
  return {
    tabIndex: tabIndex,
    'data-intent': isKeyboardNavigating ? 'keyboard' : 'mouse',
    className: cn(
      props.className,
      'rw-widget',
      props.disabled && 'rw-state-disabled',
      props.readOnly && 'rw-state-readonly',
      props.focused && 'rw-state-focus',
      props.autofilling && 'rw-webkit-autofill',
      props.open && `rw-open${props.dropUp ? '-up' : ''}`,
    ),
  }
}

const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  (
    {
      className,
      tabIndex,
      focused,
      open,
      dropUp,
      disabled,
      readOnly,
      autofilling,
      ...props
    },
    ref,
  ) => {
    const widgetProps = useWidgetProps({
      className,
      tabIndex,
      focused,
      open,
      dropUp,
      disabled,
      readOnly,
      autofilling,
    })

    return <div ref={ref} {...props} {...widgetProps} />
  },
)

Widget.displayName = 'Widget'

export default Widget
