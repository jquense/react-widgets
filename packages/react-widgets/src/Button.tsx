import cn from 'clsx'
import * as React from 'react'
import { ReactNode } from 'react'
import { Spinner } from './Icon'

export interface Props extends React.HTMLProps<HTMLButtonElement> {
  label?: string
  icon?: ReactNode
  busy?: boolean
  spinner?: ReactNode
  children?: ReactNode
}

function Button({
  className,
  disabled,
  label,
  icon,
  busy,
  children,
  spinner = Spinner,
  ...props
}: Props) {
  return (
    <button
      tabIndex={-1}
      {...props}
      title={label}
      type="button"
      disabled={disabled}
      aria-label={label}
      aria-disabled={disabled}
      className={cn(className, 'rw-btn')}
    >
      {busy ? spinner : icon}
      {children}
    </button>
  )
}

export default Button
