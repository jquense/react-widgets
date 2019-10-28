import PropTypes from 'prop-types'
import Localizer from 'react-widgets/lib/Localizer'

function endOfDecade(date) {
  date = new Date(date)
  date.setFullYear(date.getFullYear() + 10)
  date.setMilliseconds(date.getMilliseconds() - 1)
  return date
}

function endOfCentury(date) {
  date = new Date(date)
  date.setFullYear(date.getFullYear() + 100)
  date.setMilliseconds(date.getMilliseconds() - 1)
  return date
}

const propType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object,
  PropTypes.func,
])

export const defaultDateFormats = {
  date: { date: 'short' },
  time: { time: 'short' },
  datetime: { datetime: 'medium' },
  header: { raw: 'MMMM yyyy' },
  footer: { date: 'full' },
  weekday: { raw: 'eeeeee' },
  dayOfMonth: { raw: 'd' },
  month: { raw: 'MMM' },
  year: { raw: 'yyyy' },

  decade: (dt, l) =>
    `${l.formatDate(dt, l.dateFormats.year)} - ${l.formatDate(
      endOfDecade(dt),
      l.dateFormats.year,
    )}`,

  century: (dt, l) =>
    `${l.formatDate(dt, l.dateFormats.year)} - ${l.formatDate(
      endOfCentury(dt),
      l.dateFormats.year,
    )}`,
}
export const defaultNumberFormats = {
  default: { maximumFractionDigits: 0 },
}

/**
 * A `react-widgets` Localizer for [Globalize.js](https://github.com/globalizejs/globalize).
 * The Globalize localizer handles _both_ dates and numbers and is suitable for all widgets.
 *
 * ```js
 * const globalize = require('globalize');
 *
 * <LocalizationProvider localizer={new GlobalizeLocalizer(globalize, { culture: 'es' })}
 * ```
 */
class GlobalizeLocalizer extends Localizer {
  /**
   *
   * @param {Object} globalize The globalize.js instance
   * @param {Object} options
   * @param {string} options.culture The current culture tag ('es', 'en-us', etc). if omited Globalize.culture() will be used
   * @param {Object} options.dateFormats Overrides for the default date formats
   * @param {Object} options.numberFormats Overrides for the default number formats
   */
  constructor(
    globalize,
    {
      culture,
      dateFormats = defaultDateFormats,
      numberFormats = defaultNumberFormats,
    },
  ) {
    super({ propType, dateFormats, numberFormats })

    this.g = culture ? this.g(culture) : this.g

    let date = new Date()
    let localeDay = this.g.formatDate(date, { raw: 'e' })

    //cldr-data doesn't seem to be zero based
    localeDay = Math.max(parseInt(localeDay, 10) - 1, 0)
    this.firstOfWeek = Math.abs(date.getDay() - localeDay)
  }

  _formatDate(value, format) {
    format = typeof format === 'string' ? { raw: format } : format
    return this.g.formatDate(value, format)
  }
  _formatNumber(value, format) {
    if (value == null) return value
    if (format && format.currency)
      return this.g.formatCurrency(value, format.currency, format)

    return this.g.formatNumber(value, format)
  }
  parseDate(value, format) {
    format = typeof format === 'string' ? { raw: format } : format
    return this.g.parseDate(value, format)
  }
  parseNumber(value) {
    return this.g.parseNumber(value)
  }
  decimalChar() {
    let str = this.g.formatNumber(1.1, { raw: '0.0' })
    return str[str.length - 2] || '.'
  }
  precision(format) {
    return !format || format.maximumFractionDigits == null
      ? super.precision()
      : format.maximumFractionDigits
  }
}

export default GlobalizeLocalizer
