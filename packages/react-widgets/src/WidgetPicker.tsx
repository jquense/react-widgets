import cn from 'classnames'
import React from 'react'

function WidgetPicker({
  className,
  hideCaret = false,
  busy = false,
  ...props
}: React.HTMLProps<HTMLDivElement> & { hideCaret?: boolean, busy?: boolean }) {
  return (
    <div
      {...props}
      className={cn(
        className,
        'rw-widget-picker',
        'rw-widget-container',
        (hideCaret && !busy) && 'rw-hide-caret',
      )}
    />
  )
}

export default WidgetPicker
