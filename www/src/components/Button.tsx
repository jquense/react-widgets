import cn from 'classnames'
import React from 'react'

function Button(props) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        props.className,
        'inline-flex items-center bg-primary text-white hover:bg-accent px-5 py-2 rounded',
      )}
    />
  )
}

export default Button
