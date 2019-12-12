import {
  DateLocalizer,
  DateTimePart,
  NumberLocalizer,
  RequiredDateMethods,
} from './Localization'
import dates from './util/dates'

type Formatters = {
  [Key in RequiredDateMethods]: (date?: number | Date) => string
}
/**
 * A `react-widgets` Localizer using native `Intl` APIs.
 *
 */
class IntlDateLocalizer implements DateLocalizer<Intl.DateTimeFormatOptions> {
  culture: string

  firstOfWeek: () => number

  date!: (date: Date, format?: Intl.DateTimeFormatOptions) => string
  time!: (date: Date, format?: Intl.DateTimeFormatOptions) => string
  datetime!: (date: Date, format?: Intl.DateTimeFormatOptions) => string
  header!: (date: Date, format?: Intl.DateTimeFormatOptions) => string
  footer!: (date: Date, format?: Intl.DateTimeFormatOptions) => string
  weekday!: (date: Date, format?: Intl.DateTimeFormatOptions) => string
  dayOfMonth!: (date: Date, format?: Intl.DateTimeFormatOptions) => string
  month!: (date: Date, format?: Intl.DateTimeFormatOptions) => string
  year!: (date: Date, format?: Intl.DateTimeFormatOptions) => string
  decade!: (date: Date, format?: Intl.DateTimeFormatOptions) => string
  century!: (date: Date, format?: Intl.DateTimeFormatOptions) => string

  constructor({ culture, firstOfWeek = 0 }) {
    this.culture = culture
    this.firstOfWeek = () => firstOfWeek

    const formats: Formatters = {
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
      decade: (date: Date) =>
        `${this.year(date)} - ${this.year(dates.endOf(date, 'decade'))}`,
      century: (date: Date) =>
        `${this.year(date)} - ${this.year(dates.endOf(date, 'century'))}`,
    }

    Object.keys(formats).forEach((key: RequiredDateMethods) => {
      this[key] = (date: Date, format?: Intl.DateTimeFormatOptions): string => {
        return format
          ? date.toLocaleString(culture, format)
          : formats[key](date)
      }
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

class IntlNumberLocalizer implements NumberLocalizer<Intl.NumberFormatOptions> {
  culture: string
  decimalCharacter: () => string
  format: (date: number, format?: Intl.NumberFormatOptions) => string

  constructor({ culture }) {
    this.culture = culture

    const decimal = Intl.NumberFormat(culture).formatToParts(1.1)[1].value
    const formatter = Intl.NumberFormat(culture, { maximumFractionDigits: 0 })
      .format

    this.decimalCharacter = () => decimal
    this.format = (num: number, format?: Intl.NumberFormatOptions): string => {
      return format ? num.toLocaleString(culture, format) : formatter(num)
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
