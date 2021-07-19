import React, { useState } from 'react'

const padStart = (
  value: string | number | null | undefined,
  len: number,
  padding: string,
) => {
  let str = String(value ?? '')
  while (str.length < len) str = padding + str
  return str
}

interface Props
  extends Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'> {
  value: string | undefined | null
  valueNumber?: number
  size: number
  pad?: number
  placeholder?: string
  min: number
  max: number
  emptyChar?: string
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onSelect?: React.ReactEventHandler<HTMLDivElement>
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const DateTimePartInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      valueNumber = value ? +value : undefined,
      pad,
      size,
      placeholder,
      min,
      max,
      emptyChar,
      onFocus,
      onBlur,
      onSelect,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)

      e.target.selectionStart = 0
      e.target.selectionEnd = size - 1

      if (onFocus) onFocus(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (onBlur) onBlur(e)
    }

    const throttleSelect = (e: React.SyntheticEvent<HTMLDivElement>) => {
      const target = e.target as HTMLInputElement
      if (onSelect && target.selectionStart! < target.selectionEnd!) {
        onSelect(e)
      }
    }

    let paddedValue
    if (placeholder && !value) paddedValue = ''
    else if (!isFocused)
      paddedValue = padStart(value, pad || 0, value == null ? emptyChar! : '0')
    else paddedValue = value

    return (
      <input
        {...props}
        ref={ref}
        data-focusable
        autoComplete="off"
        role="spinbutton"
        aria-valuenow={valueNumber ?? void 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={value ?? ''}
        // seems readonly is not valid
        aria-disabled={props.disabled || props.readOnly}
        aria-placeholder={placeholder}
        placeholder={placeholder}
        className="rw-btn-input-reset rw-time-part-input"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSelect={throttleSelect}
        onChange={onChange}
        value={paddedValue!}
        size={size}
      />
    )
  },
)

export default DateTimePartInput
