import formatWithOptions from 'date-fns/fp/formatWithOptions'
import parseWithOptions from 'date-fns/fp/parseWithOptions'
import addYears from 'date-fns/fp/addYears'
import enUS from 'date-fns/locale/en-US'

import { DateLocalizer } from 'react-widgets/lib/Localization'

const endOfDecade = addYears(10)
const endOfCentury = addYears(100)

export default class DateFnsLocalizer implements DateLocalizer<string> {
  readonly locale: Locale

  constructor(locale: Locale) {
    this.locale = locale || enUS

    const { options } = this.locale
    this.firstOfWeek = () => (options && options.weekStartsOn) || 0
  }

  firstOfWeek() {
    return this.locale.options?.weekStartsOn ?? 0
  }

  date(date: Date, format?: string) {
    return this.format(date, format || 'P')
  }

  time(date: Date, format?: string) {
    return this.format(date, format || 'pp')
  }

  datetime(date: Date, format?: string) {
    return this.format(date, format || 'Pp')
  }

  header(date: Date, format?: string) {
    return this.format(date, format || 'MMMM yyyy')
  }

  weekday(date: Date, format?: string) {
    return this.format(date, format || 'cccccc')
  }

  dayOfMonth(date: Date, format?: string) {
    return this.format(date, format || 'DD')
  }

  month(date: Date, format?: string) {
    return this.format(date, format || 'MMM')
  }

  year(date: Date, format?: string) {
    return this.format(date, format || 'YYYY')
  }

  decade(date: Date, format?: string) {
    return format
      ? this.format(date, format)
      : `${this.format(date, 'YYYY')} - ${this.format(
          endOfDecade(date),
          'YYYY',
        )}`
  }

  century(date: Date, format?: string) {
    return format
      ? this.format(date, format)
      : `${this.format(date, 'YYYY')} - ${this.format(
          endOfCentury(date),
          'YYYY',
        )}`
  }

  private format(value: Date, format: string) {
    return formatWithOptions({ locale: this.locale }, format, value)
  }

  parse(value: string, format: string) {
    const result = parseWithOptions(
      { locale: this.locale },
      new Date(),
      format,
      value,
    )

    if (result.toString() === 'Invalid Date') {
      return null
    }

    return result
  }
}
