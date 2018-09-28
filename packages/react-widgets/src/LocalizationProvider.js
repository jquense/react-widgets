import React from 'react'

import { getMessages } from './messages'

function mergeWithDefaults(date, number, formatOverrides, messages) {
  if (!date && !number)
    throw new Error('This component requires a Localizer but none was provided')

  if (date?.__original) [date, number] = date.__original
  number = number || date

  return {
    messages: getMessages(messages),
    get datePropType() {
      return date.propType
    },
    get numberPropType() {
      return number.propType
    },
    get firstOfWeek() {
      return date.firstOfWeek
    },

    formatDate: (value, format) =>
      date.formatDate(
        value,
        formatOverrides[format] || date.dateFormats[format] || format,
      ),
    parseDate: date.parseDate.bind(date),

    formatNumber: (value, format) =>
      number.formatNumber(
        value,
        formatOverrides[format] || number.numberFormats[format] || format,
      ),

    parseNumber: number.parseNumber.bind(number),
    decimalChar: number.decimalChar.bind(number),
    precision: number.precision.bind(number),
    __original: [date, number],
  }
}

const LocalizerContext = React.createContext(
  process.env.NODE_ENV === 'test' && { date: global.TEST_LOCALIZER },
)

const propTypes = {
  /**
   * A single localizer instance for both date and number localization.
   *
   * @type {Localizer}
   */
  localizer: () => {},

  /**
   * A date-only localizer instance, should be combined with `numberLocalizer` if both are needed.
   *
   * @type {Localizer}
   */
  dateLocalizer: () => {},

  /**
   * A number-only localizer instance, should be combined with `dateLocalizer` if both are needed.
   *
   * @type {Localizer}
   */
  numberLocalizer: () => {},
}

const Provider = ({ localizer, dateLocalizer, numberLocalizer, children }) => (
  <LocalizerContext.Provider
    value={{ date: dateLocalizer || localizer, number: numberLocalizer }}
  >
    {children}
  </LocalizerContext.Provider>
)

Provider.propTypes = propTypes

Provider.Consumer = LocalizerContext.Consumer

Provider.withLocalizer = Component => {
  const render = ({ messages, formats, ...props }, ref) => (
    <LocalizerContext.Consumer>
      {({ date, number } = {}) => (
        <Component
          ref={ref}
          {...props}
          formats={formats}
          localizer={mergeWithDefaults(date, number, formats || {}, messages)}
        />
      )}
    </LocalizerContext.Consumer>
  )
  render.displayName = `withLocalizer(${Component.name})`
  return Object.assign(React.forwardRef(render), { Component })
}

export default Provider
