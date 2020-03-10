import cn from 'classnames'
import * as React from 'react'
import { ReactNode } from 'react'
import { Spinner } from './Icon'

export interface Props extends React.HTMLProps<HTMLButtonElement> {
  label?: string
  icon?: ReactNode
  busy?: boolean
  active?: boolean
  variant?: 'primary' | 'select' | null
  spinner?: ReactNode
  acceptFocus?: boolean
  children?: ReactNode
  component?: React.ElementType
}

function Button({
  className,
  disabled,
  label,
  icon,
  busy,
  active,
  type,
  acceptFocus,
  children,
  variant = 'primary',
  spinner = Spinner,
  component: Tag = 'button',
  ...props
}: Props) {
  if (Tag === 'button') type = type || 'button'

  return (
    <Tag
      {...props}
      title={label}
      type={type}
      tabIndex={!acceptFocus ? -1 : undefined}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={label}
      className={cn(
        className,
        'rw-btn',
        !acceptFocus && 'rw-outline-none',
        active && !disabled && 'rw-state-active',
        variant && 'rw-btn-' + variant,
      )}
    >
      {busy ? spinner : icon}

      {children}
    </Tag>
  )
}

export default Button
