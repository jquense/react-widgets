import cn from 'classnames'
import React from 'react'

function WidgetPicker({
  className,
  hideCaret = false,
  ...props
}: React.HTMLProps<HTMLDivElement> & { hideCaret?: boolean }) {
  return (
    <div
      {...props}
      className={cn(
        className,
        'rw-widget-picker',
        'rw-widget-container',
        hideCaret && 'rw-hide-caret',
      )}
    />
  )
}

export default WidgetPicker
