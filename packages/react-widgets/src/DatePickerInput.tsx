import cn from 'classnames'
import React, { useMemo, useRef, useState } from 'react'
import Input, { InputProps } from './Input'
import { Localizer, RequiredDateMethods } from './Localization'

export interface DatePickerInputProps<TDateFormat = unknown>
  extends Omit<InputProps, 'value' | 'onChange'> {
  formatter: RequiredDateMethods
  editing: boolean
  editFormat?: TDateFormat
  displayFormat?: TDateFormat
  parse: (str: string) => Date | null
  value?: Date | null
  onChange: (date: Date | null, rawValue: string) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  localizer: Localizer<TDateFormat>

  disabled?: boolean
  readOnly?: boolean
}

const DatePickerInput = React.forwardRef(
  (
    {
      value,
      formatter,
      editing,
      editFormat,
      displayFormat,
      localizer,
      parse,
      onChange,
      onBlur,
      disabled,
      readOnly,
      ...props
    }: DatePickerInputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const needsFlush = useRef(false)

    const nextTextValue = useMemo(
      () =>
        value instanceof Date && isValid(value)
          ? localizer.formatDate(
              value,
              formatter,
              editing ? editFormat : displayFormat,
            )
          : '',
      [value, formatter, localizer, displayFormat, editing, editFormat],
    )

    const [prevValue, setPrevValue] = useState(nextTextValue)
    const [textValue, setTextValue] = useState(nextTextValue)

    if (prevValue !== nextTextValue) {
      setPrevValue(nextTextValue)
      setTextValue(nextTextValue)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(event)

      if (needsFlush.current) {
        let date = parse(event.target.value)

        const dateIsInvalid = event.target.value != '' && date == null
        if (dateIsInvalid) {
          setTextValue('')
        }
        needsFlush.current = false

        onChange(date, event.target.value)
      }
    }

    const handleChange = ({ target }: React.FormEvent<HTMLInputElement>) => {
      needsFlush.current = true
      setTextValue((target as HTMLInputElement).value)
    }

    return (
      <Input
        {...props}
        type="text"
        ref={ref}
        className={cn('rw-widget-input', props.className)}
        value={textValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
  },
)

DatePickerInput.displayName = 'DatePickerInput'

export default DatePickerInput

function isValid(d: Date) {
  return !isNaN(d.getTime())
}
