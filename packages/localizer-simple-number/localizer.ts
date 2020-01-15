import deconstruct from 'deconstruct-number-format'
import formatNumber from 'format-number-with-string'
import { NumberLocalizer } from 'react-widgets/lib/Localization'

let defaults = {
  decimal: '.',
  grouping: ',',
}

export type UserNumberFormat = string | ((num: number) => string)

/**
 * A straightforward number formatting and parsing localizer that is locale
 * agnostic. Provide all the localization relevant options to configure to the desired culture.
 *
 * ```js
 * const SimpleNumberLocalizer = require('react-widgets-simple-number');
 *
 * <LocalizationProvider
 *   localizer={new SimpleNumberLocalizer({
 *     decimal: ',',
 *     grouping: '.'
 *   })}
 * />
 * ```
 */
class SimpleNumberLocalizer implements NumberLocalizer<UserNumberFormat> {
  /**
   *
   * @param {Object} options            A set of options used to configure localization details
   * @param {string} options.decimal    The decimal seperator character defaults to `.`
   * @param {string} options.grouping   The "thousands" seperator char character defaults to `,`
   */
  constructor(options = {}) {
    let { decimal, grouping } = { ...defaults, ...options }

    this.decimalCharacter = () => decimal
    this.format = (num: number, format?: UserNumberFormat): string => {
      if (typeof format === 'function') {
        return format(num)
      }

      return formatNumber(num, format || `-#${grouping}##0${decimal}`)
    }
  }

  culture?: string
  decimalCharacter: () => string
  format: (num: number, format?: string) => string

  parse(value: any, format: string) {
    if (format) {
      let data = deconstruct(format),
        negative =
          (data.negativeLeftSymbol &&
            value.indexOf(data.negativeLeftSymbol) !== -1) ||
          (data.negativeRightSymbol &&
            value.indexOf(data.negativeRightSymbol) !== -1)

      value = value
        .replace(data.negativeLeftSymbol, '')
        .replace(data.negativeRightSymbol, '')
        .replace(data.prefix, '')
        .replace(data.suffix, '')

      let halves = value.split(data.decimalChar)

      if (data.integerSeperator)
        halves[0] = halves[0].replace(
          new RegExp('\\' + data.integerSeperator, 'g'),
          '',
        )

      if (data.decimalsSeparator)
        halves[1] = halves[1].replace(
          new RegExp('\\' + data.decimalsSeparator, 'g'),
          '',
        )

      if (halves[1] === '') halves.pop()

      value = halves.join('.')
      value = +value

      if (negative) value = -1 * value
    } else value = parseFloat(value)

    return isNaN(value) ? null : value
  }
}

export default SimpleNumberLocalizer
