import Globalize, {
  DateFormatterOptions,
  CurrencyFormatterOptions,
  NumberFormatterOptions,
} from 'globalize'
import {
  DateLocalizer,
  RequiredDateMethods,
  NumberLocalizer,
} from 'react-widgets/lib/Localization'

function endOfDecade(date: Date) {
  date = new Date(date)
  date.setFullYear(date.getFullYear() + 10)
  date.setMilliseconds(date.getMilliseconds() - 1)
  return date
}

function endOfCentury(date: Date) {
  date = new Date(date)
  date.setFullYear(date.getFullYear() + 100)
  date.setMilliseconds(date.getMilliseconds() - 1)
  return date
}

type DateFormatters = {
  [Key in RequiredDateMethods]:
    | DateFormatterOptions
    | ((this: GlobalizeDateLocalizer, date: Date) => string)
}

type UserDateFormat =
  | DateFormatterOptions
  | ((date: Date, culture: string) => string)

type UserNumberFormatterOptions =
  | NumberFormatterOptions
  | ({ currency: string } & CurrencyFormatterOptions)

type UserNumberFormat =
  | UserNumberFormatterOptions
  | ((num: number, culture?: string) => string)

export const defaultDateFormats: DateFormatters = {
  date: { date: 'short' },
  time: { time: 'short' },
  datetime: { datetime: 'medium' },
  header: { raw: 'MMMM yyyy' },
  weekday: { raw: 'eeeeee' },
  dayOfMonth: { raw: 'd' },
  month: { raw: 'MMM' },
  year: { raw: 'yyyy' },

  decade(date: Date) {
    return `${this.year(date)} - ${this.year(endOfDecade(date))}`
  },
  century(date: Date) {
    return `${this.year(date)} - ${this.year(endOfCentury(date))}`
  },
}

export const defaultNumberFormats = {
  default: { maximumFractionDigits: 0 },
}

export type GlobalizeDateLocalizerOptions = {
  culture?: string
  formatters?: DateFormatters
}
/**
 * A `react-widgets` Localizer for [Globalize.js](https://github.com/globalizejs/globalize).
 * The Globalize localizer handles _both_ dates and numbers and is suitable for all widgets.
 *
 * ```js
 * const { DateLocalizer, NumberLocalizer } = require('globalize');
 *
 * <LocalizationProvider
 *   date={new DateLocalizer(globalize, { culture: 'es' })}
 *   number={new NumberLocalizer(globalize, { culture: 'es' })}
 * />
 * ```
 */
class GlobalizeDateLocalizer implements DateLocalizer<DateFormatterOptions> {
  readonly g: Globalize

  firstOfWeek: () => number

  date!: (date: Date, format?: UserDateFormat) => string
  time!: (date: Date, format?: UserDateFormat) => string
  datetime!: (date: Date, format?: UserDateFormat) => string
  header!: (date: Date, format?: UserDateFormat) => string
  footer!: (date: Date, format?: UserDateFormat) => string
  weekday!: (date: Date, format?: UserDateFormat) => string
  dayOfMonth!: (date: Date, format?: UserDateFormat) => string
  month!: (date: Date, format?: UserDateFormat) => string
  year!: (date: Date, format?: UserDateFormat) => string
  decade!: (date: Date, format?: UserDateFormat) => string
  century!: (date: Date, format?: UserDateFormat) => string

  /**
   *
   * @param {Object} globalize The globalize.js instance
   * @param {Object} options
   * @param {string} options.culture The current culture tag ('es', 'en-us', etc). if omited Globalize.culture() will be used
   * @param {Object} options.dateFormats Overrides for the default date formats
   * @param {Object} options.numberFormats Overrides for the default number formats
   */
  constructor(
    globalize: Globalize,
    {
      culture,
      formatters = defaultDateFormats,
    }: GlobalizeDateLocalizerOptions = {},
  ) {
    this.g = culture ? (globalize as any)(culture) : globalize

    let date = new Date()
    let localeDay = this.g.formatDate(date, { raw: 'e' })

    const normalizeFormat = (date: Date, format: UserDateFormat) => {
      return typeof format === 'function'
        ? format(date, culture || 'en')
        : this.g.formatDate(date, format)
    }

    //cldr-data doesn't seem to be zero based
    const first = Math.abs(
      date.getDay() - Math.max(parseInt(localeDay, 10) - 1, 0),
    )
    this.firstOfWeek = () => first

    Object.keys(formatters).forEach((key: RequiredDateMethods) => {
      let provided = formatters[key]
      if (typeof provided !== 'function')
        provided = this.g.dateFormatter(provided)

      this[key] = (date: Date, format?: UserDateFormat): string =>
        format ? normalizeFormat(date, format) : (provided as any)(date)
    })
  }

  parse(value: string, format?: DateFormatterOptions) {
    return this.g.parseDate(value, format)
  }
}

class GlobalizeNumberLocalizer
  implements NumberLocalizer<NumberFormatterOptions> {
  readonly g: Globalize

  culture?: string
  decimalCharacter: () => string
  format: (num: number, format?: UserNumberFormat) => string

  constructor(globalize: Globalize, { culture, formatter }: any = {}) {
    this.culture = culture
    this.g = culture ? (globalize as any)(culture) : globalize

    let str = this.g.formatNumber(1.1, { raw: '0.0' } as any)
    const decimal = str[str.length - 2] || '.'

    formatter =
      typeof formatter !== 'function'
        ? this.g.numberFormatter(formatter)
        : formatter

    this.decimalCharacter = () => decimal
    this.format = (num: number, format?: UserNumberFormat): string => {
      if (format) {
        return typeof format === 'function'
          ? format(num, culture)
          : 'currency' in format
          ? this.g.formatCurrency(num, format.currency, format)
          : this.g.formatNumber(num, format)
      }

      return formatter(num)
    }
  }

  parse(value: string) {
    return this.g.parseNumber(value)
  }
}

export default GlobalizeLocalizer

export {
  GlobalizeDateLocalizer as DateLocalizer,
  GlobalizeNumberLocalizer as NumberLocalizer,
}
