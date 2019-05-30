import invariant from 'invariant'
import PropTypes from 'prop-types'

const notImplemented = () =>
  new Error('ReactWidgets Localizer: Not implemented')

let checkDateFormats
let checkNumberFormats
if (process.env.NODE_ENV !== 'production') {
  checkDateFormats = formats => {
    if (formats)
      [
        'date',
        'time',
        'datetime',
        'header',
        'footer',
        'weekday',
        'dayOfMonth',
        'month',
        'year',
        'decade',
        'century',
      ].forEach(f =>
        invariant(f in formats, `localizer missing required format: \`${f}\``),
      )
  }
  checkNumberFormats = formats => {
    if (formats)
      ['default'].forEach(f =>
        invariant(f in formats, `localizer missing required format: \`${f}\``),
      )
  }
}

const localePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.func])

export function mergeWithDefaults(localizer, formatOverrides, messages) {
  return {
    ...localizer,
    messages,
    parseDate: (value, format) =>
      localizer.parseDate(
        value,
        formatOverrides[format] || localizer.dateFormats[format] || format,
      ),
    formatDate: (value, format) =>
      localizer.formatDate(
        value,
        formatOverrides[format] || localizer.dateFormats[format] || format,
      ),
    formatNumber: (value, format) =>
      localizer.formatNumber(
        value,
        formatOverrides[format] || localizer.numberFormats[format] || format,
      ),
  }
}

export default class Localizer {
  constructor({ dateFormats, numberFormats, propType }) {
    if (process.env.NODE_ENV !== 'production') {
      checkDateFormats(dateFormats)
      checkNumberFormats(numberFormats)
    }
    this.propType = propType || localePropType
    this.numberFormats = numberFormats
    this.dateFormats = dateFormats
    this.firstOfWeek = 0
  }
  _formatDate() {
    throw notImplemented()
  }
  _formatNumber() {
    throw notImplemented()
  }
  formatDate(date, format) {
    return typeof format === 'function'
      ? format(date, this)
      : this._formatDate(date, format)
  }
  parseDate() {
    throw notImplemented()
  }
  formatNumber(number, format) {
    return typeof format === 'function'
      ? format(number, this)
      : this._formatNumber(number, format)
  }
  parseNumber() {
    throw notImplemented()
  }

  decimalChar() {
    return '.'
  }
  precision() {
    return null
  }
}
