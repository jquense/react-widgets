import Moment from 'moment'
import {
  DateLocalizer,
  DateTimePart,
  DateTimePartType,
} from 'react-widgets/lib/Localization'

type MomentPartMap = Record<DateTimePartType, string>

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

export default class MomentLocalizer implements DateLocalizer<string> {
  private m: typeof Moment
  private localeData: Moment.Locale

  constructor(moment: typeof Moment) {
    this.m = moment
    this.localeData = this.m.localeData()
  }

  toFormattedParts(date: Date, format: MomentPartMap): DateTimePart[] {
    const m = this.m(date)
    return Object.keys(format).map((type: DateTimePartType) => ({
      type,
      value: type === 'literal' ? format[type] : m.format(format[type]),
    }))
  }

  date(date: Date, format?: string) {
    return this.m(date).format(format || 'L')
  }

  time(date: Date, format?: string) {
    return this.m(date).format(format || 'LT')
  }

  datetime(date: Date, format?: string) {
    return this.m(date).format(format || 'lll')
  }

  header(date: Date, format?: string) {
    return this.m(date).format(format || 'MMM YYYY')
  }

  footer(date: Date, format?: string) {
    return this.m(date).format(format || 'LL')
  }

  weekday(date: Date, format?: string) {
    return this.m(date).format(format || 'dd')
  }

  dayOfMonth(date: Date, format?: string) {
    return this.m(date).format(format || 'DD')
  }

  month(date: Date, format?: string) {
    return this.m(date).format(format || 'MMM')
  }

  year(date: Date, format?: string) {
    return this.m(date).format(format || 'YYYY')
  }

  decade(date: Date, format?: string) {
    return format
      ? this.m(date).format(format)
      : `${this.m(date).format('YYYY')} - ${this.m(endOfDecade(date)).format(
          'YYYY',
        )}`
  }

  century(date: Date, format?: string) {
    return format
      ? this.m(date).format(format)
      : `${this.m(date).format('YYYY')} - ${this.m(endOfCentury(date)).format(
          'YYYY',
        )}`
  }

  firstOfWeek() {
    return this.localeData.firstDayOfWeek()
  }

  parse(value: string, format: string) {
    if (!value) return null
    const m = this.m(value, format)
    return m.isValid() ? m.toDate() : null
  }
}
