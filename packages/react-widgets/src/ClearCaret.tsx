import cn from 'classnames'
import * as React from 'react'
import { ReactNode } from 'react'
import { times } from './Icon'

export interface Props extends React.HTMLProps<HTMLSpanElement> {
  icon?: ReactNode
}

const ClearCaret = ({
  className,
  icon = times,
  ...props
}: Props) => (
  <span
    {...props}
    aria-hidden="true"
    className={cn(className, 'rw-btn rw-picker-caret')}
  >
    {icon}
  </span>
)

export default ClearCaret
