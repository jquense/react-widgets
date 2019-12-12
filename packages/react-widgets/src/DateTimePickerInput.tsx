import invariant from 'invariant'
import React, { useMemo, useRef, useState } from 'react'
import Input from './Input'

// interface DateTimePickerInput extends InputProps {
//   format: RequiredDateMethods,
//   editing: boolean,
//   editFormat: CustomPropTypes.dateFormat,
//   parse: (),
//   value: PropTypes.instanceOf(Date),
//   onChange: PropTypes.func.isRequired,
//   onBlur: PropTypes.func,
//   localizer: PropTypes.object.isRequired,

//   disabled: CustomPropTypes.disabled,
//   readOnly: CustomPropTypes.disabled,
// }

const DateTimePickerInput = React.forwardRef<any, any>(
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
    },
    ref,
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

    const parseStringInput = string => {
      invariant(
        parse || format || editFormat,
        'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' +
          'the DateTimePicker is unable to parse `%s` into a dateTime, ' +
          'please provide either a parse function or localizer compatible `format` prop',
        string,
      )

      let date
      let checkFormats = [format, editFormat]

      if (typeof parse == 'function') {
        date = parse(string)
        if (date) return date
      } else {
        // parse is a string format or array of string formats
        checkFormats = checkFormats.concat(parse).filter(Boolean)
      }

      for (let i = 0; i < checkFormats.length; i++) {
        date = localizer.parseDate(string, checkFormats[i])
        if (date) return date
      }

      return null
    }

    const handleBlur = event => {
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

    const handleChange = ({ target: { value } }) => {
      needsFlush.current = true
      setTextValue(value)
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

function isValid(d) {
  return !isNaN(d.getTime())
}
