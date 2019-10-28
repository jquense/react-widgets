import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { useImperativeHandle, useRef } from 'react'
import { useUncontrolled } from 'uncontrollable'
import Button from './Button'
import Calendar from './Calendar'
import DateTimePickerInput from './DateTimePickerInput'
import { calendar } from './Icon'
import LocalizationProvider from './LocalizationProvider'
import Popup from './Popup'
import Select from './Select'
import TimeInput from './TimeInput'
import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import * as CustomPropTypes from './util/PropTypes'
import dates from './util/dates'
import { useDropodownToggle } from './util/hooks'
import { createEditableCallback } from './util/interaction'
import useTabTrap from './util/tabTrap'
import useFocusManager from './util/useFocusManager'
import {
  notify,
  useFirstFocusedRender,
  useInstanceId,
} from './util/widgetHelpers'

// import TimeList from './TimeList'

let propTypes = {
  /**
   * @example ['valuePicker', [ ['new Date()', null] ]]
   */
  value: PropTypes.instanceOf(Date),

  /**
   * @example ['onChangePicker', [ ['new Date()', null] ]]
   */
  onChange: PropTypes.func,

  /**
   * @example ['openDateTime']
   */
  open: PropTypes.bool,
  onToggle: PropTypes.func,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: PropTypes.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: PropTypes.func,
  onSelect: PropTypes.func,

  /**
   * The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: PropTypes.instanceOf(Date),

  /**
   * The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: PropTypes.instanceOf(Date),

  /**
   * The amount of minutes between each entry in the time list.
   *
   * @example ['prop', { step: 90 }]
   */
  step: PropTypes.number,

  formats: PropTypes.shape({
    /**
     * A formatter used to display the date value. For more information about formats
     * visit the [Localization page](/localization)
     *
     * @example ['dateFormat', ['default', "{ raw: 'MMM dd, yyyy' }", null, { defaultValue: 'new Date()', time: 'false' }]]
     */
    value: CustomPropTypes.dateFormat,

    /**
     * A formatter to be used while the date input has focus. Useful for showing a simpler format for inputing.
     * For more information about formats visit the [Localization page](/localization)
     *
     * @example ['dateFormat', ['edit', "{ date: 'short' }", null, { defaultValue: 'new Date()', format: "{ raw: 'MMM dd, yyyy' }", time: 'false' }]]
     */
    editValue: CustomPropTypes.dateFormat,
  }),

  /**
   * Enable the time list component of the picker.
   */
  includeTime: PropTypes.bool,

  timePrecision: PropTypes.oneOf(['minutes', 'seconds', 'milliseconds']),

  timeInputProps: PropTypes.object,

  /** Specify the element used to render the calendar dropdown icon. */
  selectIcon: PropTypes.node,

  dropUp: PropTypes.bool,

  popupTransition: CustomPropTypes.elementType,

  placeholder: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: CustomPropTypes.disabled,
  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: CustomPropTypes.disabled,

  /**
   * Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try,
   * or provide a function that returns a date to handle parsing yourself. When `parse` is unspecified and
   * the `format` prop is a `string` parse will automatically use that format as its default.
   */
  parse: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.func,
  ]),

  /** @ignore */
  tabIndex: PropTypes.any,
  /** @ignore */
  'aria-labelledby': PropTypes.string,
  /** @ignore */
  'aria-describedby': PropTypes.string,

  /** @ignore */
  localizer: PropTypes.any,

  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,

  calendarProps: PropTypes.object,
  inputProps: PropTypes.object,
  isRtl: PropTypes.bool,
  messages: PropTypes.shape({
    dateButton: PropTypes.string,
    timeButton: PropTypes.string,
  }),
}

const defaultProps = {
  ...Calendar.defaultProps,

  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  includeTime: true,
  selectIcon: calendar,
  formats: {},
}

/**
 * ---
 * subtitle: DatePicker, TimePicker
 * localized: true
 * shortcuts:
 *   - { key: alt + down arrow, label:  open calendar or time }
 *   - { key: alt + up arrow, label: close calendar or time }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * @public
 * @extends Calendar
 */
const DateTimePicker = React.forwardRef((uncontrolledProps, outerRef) => {
  const {
    id,
    value,
    onChange,
    onSelect,
    onToggle,
    onKeyDown,
    onKeyPress,
    onCurrentDateChange,
    inputProps,
    calendarProps,
    timeInputProps,
    autoFocus,
    tabIndex,
    disabled,
    readOnly,
    className,
    containerClassName,
    name,
    selectIcon,
    placeholder,
    includeTime,
    min,
    max,
    isRtl,
    open,
    dropUp,
    parse,
    messages,
    formats,
    currentDate,
    popupTransition,
    timePrecision,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    ...elementProps
  } = useUncontrolled(uncontrolledProps, {
    open: 'onToggle',
    value: 'onChange',
    currentDate: 'onCurrentDateChange',
  })
  const localizer = LocalizationProvider.useLocalizer(messages, formats)

  const ref = useRef()
  const calRef = useRef()

  const tabTrap = useTabTrap(calRef)

  const inputId = useInstanceId(id, '_input')
  const dateId = useInstanceId(id, '_date')
  const activeCalendarId = useInstanceId(id, '_calendar_active_cell')

  const currentFormat = includeTime ? 'datetime' : 'date'

  const toggle = useDropodownToggle(open, onToggle)

  const [focusEvents, focused] = useFocusManager(ref, uncontrolledProps, {
    didHandle(focused) {
      if (!focused) {
        toggle.close()
        tabTrap.stop()
      } else if (open) {
        tabTrap.focus()
      }
    },
  })

  /**
   * Handlers
   */
  const useEditableCallback = createEditableCallback(disabled || readOnly, ref)

  const handleChange = useEditableCallback((date, str, constrain) => {
    if (constrain) date = inRangeValue(date)

    if (onChange) {
      if (date == null || value == null) {
        if (
          date != value //eslint-disable-line eqeqeq
        )
          onChange(date, str)
      } else if (!dates.eq(date, value)) {
        onChange(date, str)
      }
    }
  })

  const handleKeyDown = useEditableCallback(e => {
    notify(onKeyDown, [e])

    if (e.defaultPrevented) return

    if (e.key === 'Escape' && open) {
      toggle.close()
    } else if (e.altKey) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        toggle.open()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        toggle.close()
      }
    }
  })

  const handleKeyPress = useEditableCallback(e => {
    notify(onKeyPress, [e])

    if (e.defaultPrevented) return
  })

  const handleDateSelect = useEditableCallback(date => {
    let dateTime = dates.merge(date, value, currentDate)
    let dateStr = formatDate(date)

    if (!includeTime) toggle.close()

    notify(onSelect, [dateTime, dateStr])
    handleChange(dateTime, dateStr, true)
    ref.current?.focus()
  })

  const handleTimeChange = useEditableCallback(date => {
    handleChange(date, formatDate(date), true)
  })

  const handleCalendarClick = useEditableCallback(() => {
    // this.focus()
    toggle()
  })

  const handleOpening = () => {
    tabTrap.start()
    requestAnimationFrame(() => {
      tabTrap.focus()
    })
  }

  const handleClosing = () => {
    tabTrap.stop()
    if (focused) focus()
  }

  /**
   * Methods
   */

  function focus() {
    if (open) calRef?.focus()
    else ref.current?.focus()
  }

  function inRangeValue(value) {
    if (value == null) return value

    return dates.max(dates.min(value, max), min)
  }

  function formatDate(date) {
    return date instanceof Date && !isNaN(date.getTime())
      ? localizer.formatDate(date, currentFormat)
      : ''
  }

  useImperativeHandle(outerRef, () => ({
    focus,
  }))

  let shouldRenderList = useFirstFocusedRender(focused, open)

  let inputReadOnly =
    inputProps?.readOnly != null ? inputProps?.readOnly : readOnly
  return (
    <Widget
      {...elementProps}
      open={!!open}
      dropUp={dropUp}
      focused={focused}
      disabled={disabled}
      readOnly={readOnly}
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyPress}
      {...focusEvents}
      className={cn(className, 'rw-datetime-picker')}
    >
      <WidgetPicker className={containerClassName}>
        <DateTimePickerInput
          {...inputProps}
          id={inputId}
          ref={ref}
          role="combobox"
          name={name}
          value={value}
          tabIndex={tabIndex}
          autoFocus={autoFocus}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={inputReadOnly}
          format={currentFormat}
          editFormat={formats.editValue}
          editing={focused}
          localizer={localizer}
          parse={parse}
          onChange={handleChange}
          aria-haspopup
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          aria-expanded={!!open}
          aria-owns={dateId}
        />

        <Select bordered>
          <Button
            icon={selectIcon}
            label={localizer.messages.dateButton()}
            disabled={disabled || readOnly}
            onClick={handleCalendarClick}
          />
        </Select>
      </WidgetPicker>

      {!!shouldRenderList && (
        <Popup
          dropUp={dropUp}
          open={open}
          role="dialog"
          className="rw-calendar-popup"
          transition={popupTransition}
          onEntering={handleOpening}
          onExited={handleClosing}
        >
          <div ref={calRef} id={dateId}>
            <Calendar
              min={min}
              max={max}
              {...calendarProps}
              isRtl={isRtl}
              activeId={activeCalendarId}
              tabIndex="-1"
              value={value}
              autoFocus={false}
              onChange={handleDateSelect}
              currentDate={currentDate}
              onCurrentDateChange={onCurrentDateChange}
              aria-hidden={!open}
              aria-live="polite"
              aria-labelledby={inputId}
            />
            {includeTime && (
              <TimeInput
                {...timeInputProps}
                value={value}
                precision={timePrecision}
                onChange={handleTimeChange}
                datePart={currentDate}
              />
            )}
          </div>
        </Popup>
      )}
    </Widget>
  )
})

DateTimePicker.displayName = 'DateTimePicker'
DateTimePicker.propTypes = propTypes
DateTimePicker.defaultProps = defaultProps

export default DateTimePicker
