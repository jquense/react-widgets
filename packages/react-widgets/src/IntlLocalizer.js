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

const propType = PropTypes.oneOfType([PropTypes.object, PropTypes.func])

/**
 * A `react-widgets` Localizer using native `Intl` APIs.
 *
 */
class IntlLocalizer extends Localizer {
  /**
   *
   * @param {Object} options
   * @param {string} options.culture The current culture tag ('es', 'en-us', etc). if omited Globalize.culture() will be used
   * @param {Object} options.dateFormats Overrides for the default date formats
   * @param {Object} options.numberFormats Overrides for the default number formats
   */
  constructor({
    culture,
    firstOfWeek = 0,
    dateFormats = {
      date: Intl.DateTimeFormat(culture, { dateStyle: 'short' }).format,
      time: Intl.DateTimeFormat(culture, { timeStyle: 'short' }).format,
      datetime: Intl.DateTimeFormat(culture, {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format,
      header: Intl.DateTimeFormat(culture, { month: 'short', year: 'numeric' })
        .format,
      footer: Intl.DateTimeFormat(culture, { dateStyle: 'full' }).format,
      weekday: Intl.DateTimeFormat(culture, { weekday: 'narrow' }).format,
      dayOfMonth: Intl.DateTimeFormat(culture, { day: '2-digit' }).format,
      month: Intl.DateTimeFormat(culture, { month: 'short' }).format,
      year: Intl.DateTimeFormat(culture, { year: 'numeric' }).format,

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
    },
    numberFormats = {
      default: { maximumFractionDigits: 0 },
    },
  }) {
    super({ propType, dateFormats, numberFormats })

    const decimal = Intl.NumberFormat(culture).formatToParts(1.1)[1].value

    this.decimalChar = () => decimal
    this.firstOfWeek = firstOfWeek
    this.culture = culture
  }

  _formatDate(value, format) {
    return Intl.DateTimeFormat(this.culture, format).format(value)
  }

  _formatNumber(value, format) {
    return Intl.NumberFormat(this.culture, format).format(value)
  }

  parseDate(value) {
    return new Date(value)
  }

  parseNumber(value) {
    return parseFloat(value)
  }
  precision(format) {
    return !format || format.maximumFractionDigits == null
      ? super.precision()
      : format.maximumFractionDigits
  }
}

export default IntlLocalizer
