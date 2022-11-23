import cn from 'clsx'
import React from 'react'
import Button, { Props as ButtonProps } from './Button'

interface Props extends ButtonProps {
  className?: string
  children?: any
}
function InputAddon({ className, ...props }: Props) {
  return (
    <Button
      {...props}
      className={cn(className, 'rw-input-addon rw-picker-btn')}
    />
  )
}

export default InputAddon
