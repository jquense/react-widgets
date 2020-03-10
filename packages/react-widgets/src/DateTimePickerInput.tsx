import invariant from 'invariant'
import React, { useMemo, useRef, useState } from 'react'
import Input, { InputProps } from './Input'
import { Localizer, RequiredDateMethods } from './Localization'

export interface DateTimePickerInputProps extends Omit<InputProps, "value" | "onChange"> {
  format: RequiredDateMethods;
  editing: boolean;
  editFormat?: string;
  parse: string[] | string | ((str: string)=> Date | undefined);
  value?: Date | null;
  onChange: (date: Date | null, rawValue: string)=>void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>)=> void;
  localizer: Localizer;

  disabled?: boolean;
  readOnly?: boolean;
}

const DateTimePickerInput = React.forwardRef(
  (
    {
      value,
      editing,
      editFormat,
      format,
      localizer,
      parse,
      onChange,
      onBlur,
      disabled,
      readOnly,
      ...props
    } : DateTimePickerInputProps,
    ref : React.Ref<HTMLInputElement>,
  ) => {
    const needsFlush = useRef(false)

    const nextTextValue = useMemo(
      () =>
        value instanceof Date && isValid(value)
          ? localizer.formatDate(value, format)
          : '',
      [value, localizer, editing && editFormat ? editFormat : format],
    )

    const lastValueFromProps = useRef(nextTextValue)
    const [textValue, setTextValue] = useState(nextTextValue)

    if (lastValueFromProps.current !== nextTextValue) {
      lastValueFromProps.current = nextTextValue
      setTextValue(nextTextValue)
    }

    const parseStringInput = (str: string) => {
      invariant(
        Boolean(parse || format || editFormat),
        'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' +
          'the DateTimePicker is unable to parse `%s` into a dateTime, ' +
          'please provide either a parse function or localizer compatible `format` prop',
        str,
      )

      let date
      let checkFormats = [format, editFormat]

      if (typeof parse == 'function') {
        date = parse(str)
        if (date) return date
      } else {
        // parse is a string format or array of string formats
        checkFormats = checkFormats.concat(parse).filter(Boolean)
      }

      for (let i = 0; i < checkFormats.length; i++) {
        date = localizer.parseDate(str, checkFormats[i] as any /*HACK*/)
        if (date) return date
      }

      return null
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(event)

      if (needsFlush.current) {
        let date = parseStringInput(event.target.value)

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
        className="rw-widget-input"
        value={textValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
  },
)

DateTimePickerInput.displayName = 'DateTimePickerInput'

export default DateTimePickerInput

function isValid(d : Date) {
  return !isNaN(d.getTime())
}
