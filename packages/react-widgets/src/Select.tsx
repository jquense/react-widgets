import cn from 'classnames'
import React from 'react'
import Button, { Props as ButtonProps } from './Button'

interface Props extends ButtonProps {
  className?: string
  children?: any
  bordered?: boolean
}
function Select({ className, bordered, children, ...props }: Props) {
  return (
    <span
      className={cn(className, 'rw-select', bordered && 'rw-select-bordered')}
    >
      {children ? (
        React.Children.map(
          children,
          child => child && React.cloneElement(child, { variant: 'select' }),
        )
      ) : (
        <Button {...props} variant="select" />
      )}
    </span>
  )
}

export default Select
