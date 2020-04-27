import cn from 'classnames'
import * as React from 'react'
import { ReactNode } from 'react'
import { Spinner, caretDown } from './Icon'

export interface Props extends React.HTMLProps<HTMLSpanElement> {
  icon?: ReactNode
  spinner?: ReactNode
  visible?: boolean
  busy?: boolean
}

const DropdownCaret = ({
  className,
  busy,
  visible,
  icon = caretDown,
  spinner = Spinner,

  ...props
}: Props) => (
  <span
    {...props}
    aria-hidden="true"
    className={cn(className, 'rw-btn rw-picker-caret')}
  >
    {busy ? spinner : visible ? icon : null}
  </span>
)

export default DropdownCaret
