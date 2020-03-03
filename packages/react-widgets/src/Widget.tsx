import cn from 'classnames'
import React from 'react'
import { useKeyboardNavigationCheck } from './util/hooks'

export interface WidgetProps extends React.HTMLProps<HTMLDivElement> {
  focused?: boolean
  open?: boolean
  dropUp?: boolean
  autofilling?: boolean
  isRtl?: boolean
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
    const isKeyboardNavigating = useKeyboardNavigationCheck()

    tabIndex = tabIndex != null ? tabIndex : -1

    return (
      <div
        {...props}
        ref={ref}
        tabIndex={tabIndex}
        data-intent={isKeyboardNavigating ? undefined : 'mouse'}
        className={cn(
          className,
          'rw-widget',
          isRtl && 'rw-rtl',
          disabled && 'rw-state-disabled',
          readOnly && 'rw-state-readonly',
          focused && 'rw-state-focus',
          autofilling && 'rw-webkit-autofill',
          open && `rw-open${dropUp ? '-up' : ''}`,
        )}
      />
    )
  },
)

Widget.displayName = 'Widget'

export default Widget
