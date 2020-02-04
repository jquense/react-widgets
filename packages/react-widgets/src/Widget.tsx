import cn from 'classnames'
import React from 'react'
import { useKeyboardNavigationCheck } from './util/hooks'
export interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  focused?: boolean
  open?: boolean
  dropUp?: boolean
  autofilling?: boolean
  isRtl?: boolean
  disabled?: boolean
  readOnly?: boolean
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
      props.isRtl && 'rw-rtl',
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
      isRtl,
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
      isRtl,
    })

    return <div ref={ref} {...props} {...widgetProps} />
  },
)

Widget.displayName = 'Widget'

export default Widget
