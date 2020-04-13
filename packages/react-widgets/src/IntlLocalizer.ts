import {
  DateLocalizer,
  DateTimePart,
  NumberLocalizer,
  RequiredDateMethods,
} from './Localization'
import dates from './dates'

type Formatters = {
  [Key in RequiredDateMethods]: (date?: number | Date) => string
}
type UserDateFormat =
  | Intl.DateTimeFormatOptions
  | ((date: Date, culture?: string) => string)

// assumes both are supported or none

let supportStyles = false
new Intl.DateTimeFormat(undefined, {
  // @ts-ignore
  get dateStyle() {
    supportStyles = true
  },
})

const dateShort = { day: 'numeric', month: 'numeric', year: 'numeric' }
const timeShort = { hour: 'numeric', minute: 'numeric' }
/**
 * A `react-widgets` Localizer using native `Intl` APIs.
 *
 */
class IntlDateLocalizer implements DateLocalizer<Intl.DateTimeFormatOptions> {
  culture?: string

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

  constructor({ culture = undefined, firstOfWeek = 0 } = {}) {
    this.culture = culture
    this.firstOfWeek = () => firstOfWeek

    function normalizeFormat(date: Date, format: UserDateFormat) {
      return typeof format === 'function'
        ? format(date, culture)
        : date.toLocaleString(culture, format)
    }

    const formats: Formatters = {
      date: Intl.DateTimeFormat(
        culture,
        supportStyles ? { dateStyle: 'short' } : dateShort,
      ).format,
      time: Intl.DateTimeFormat(
        culture,
        supportStyles ? { timeStyle: 'short' } : timeShort,
      ).format,
      datetime: Intl.DateTimeFormat(
        culture,
        supportStyles
          ? { dateStyle: 'short', timeStyle: 'short' }
          : { ...dateShort, ...timeShort },
      ).format,
      header: Intl.DateTimeFormat(culture, { month: 'short', year: 'numeric' })
        .format,

      weekday: Intl.DateTimeFormat(culture, { weekday: 'narrow' }).format,
      dayOfMonth: Intl.DateTimeFormat(culture, { day: '2-digit' }).format,
      month: Intl.DateTimeFormat(culture, { month: 'short' }).format,
      year: Intl.DateTimeFormat(culture, { year: 'numeric' }).format,
      decade: (date: Date) =>
        `${this.year(date)} - ${this.year(dates.endOf(date, 'decade'))}`,
      century: (date: Date) =>
        `${this.year(date)} - ${this.year(dates.endOf(date, 'century'))}`,
    }

    Object.keys(formats).forEach((key: RequiredDateMethods) => {
      this[key] = (date: Date, format?: UserDateFormat): string =>
        format ? normalizeFormat(date, format) : formats[key](date)
    })
  }

  toFormattedParts(
    date: Date,
    format: Intl.DateTimeFormatOptions = {
      dateStyle: 'short',
      timeStyle: 'short',
    },
  ): DateTimePart[] {
    return Intl.DateTimeFormat(this.culture, format)
      .formatToParts(date)
      .filter(p => p.type !== 'timeZoneName') as any
  }

  parse(value: string) {
    return new Date(value)
  }
}

type UserNumberFormat =
  | Intl.NumberFormatOptions
  | ((num: number, culture?: string) => string)

class IntlNumberLocalizer implements NumberLocalizer<Intl.NumberFormatOptions> {
  culture?: string
  decimalCharacter: () => string
  format: (num: number, format?: UserNumberFormat) => string

  constructor({ culture = undefined } = {}) {
    this.culture = culture

    const decimal = Intl.NumberFormat(culture).formatToParts
      ? Intl.NumberFormat(culture).formatToParts(1.1)[1].value
      : (1.1).toLocaleString(culture).match(/[^\d]/)?.[0] || '.'
    const formatter = Intl.NumberFormat(culture, { maximumFractionDigits: 0 })
      .format

    this.decimalCharacter = () => decimal
    this.format = (num: number, format?: UserNumberFormat): string => {
      if (format) {
        return typeof format === 'function'
          ? format(num, culture)
          : num.toLocaleString(culture, format)
      }

      return formatter(num)
    }
  }

  parse(value: string) {
    return parseFloat(value.replace(this.decimalCharacter(), '.'))
  }
}

export {
  IntlDateLocalizer as DateLocalizer,
  IntlNumberLocalizer as NumberLocalizer,
}
