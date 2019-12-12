import React from 'react'

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
  value: number | undefined | null
  valueText?: string
  pad?: number
  placeholder?: string
  min: number
  max: number
  emptyChar: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const DateTimePartInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      valueText = String(value ?? ''),
      pad,
      placeholder,
      min,
      max,
      emptyChar,
      ...props
    },
    ref,
  ) => (
    <input
      {...props}
      ref={ref}
      data-focusable
      autoComplete="off"
      role="spinbutton"
      aria-valuenow={value ?? void 0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={valueText}
      // seems readonly is not valid
      aria-disabled={props.disabled || props.readOnly}
      placeholder={placeholder}
      className="rw-input-reset rw-time-part-input"
      value={
        placeholder && !value
          ? ''
          : padStart(value, pad || 0, value == null ? emptyChar : '0')
      }
    />
  ),
)

export default DateTimePartInput
