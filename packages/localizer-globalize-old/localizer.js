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

const shortNames = Object.create(null)
const yr = 'yyyy'

const defaultDateFormats = {
  date: 'd',
  time: 't',
  datetime: 'f',
  header: 'MMMM yyyy',
  footer: 'D',
  weekday: (day, l) => l._shortDay(day),
  dayOfMonth: '%d',
  month: 'MMM',
  year: yr,

  decade: (dt, l) =>
    `${l.formatDate(dt, yr)} - ${l.formatDate(endOfDecade(dt), yr)}`,

  century: (dt, l) =>
    `${l.formatDate(dt, yr)} - ${l.formatDate(endOfCentury(dt), yr)}`,
}
const defaultNumberFormats = {
  default: 'd',
}

export default class OldGlobalizeLocalizer extends Localizer {
  constructor(
    globalize,
    {
      culture,
      dateFormats = defaultDateFormats,
      numberFormats = defaultNumberFormats,
    }
  ) {
    super({ dateFormats, numberFormats })

    this.g = globalize
    this.culture = culture
      ? this.g.findClosestCulture(culture)
      : this.g.culture()
    this.firstOfWeek = this.culture.calendar.firstDay || 0
  }

  getFormatData(format) {
    let numFormat = this.culture.numberFormat
    if (typeof format === 'string') {
      if (format.indexOf('p') !== -1) numFormat = numFormat.percent
      if (format.indexOf('c') !== -1) numFormat = numFormat.curency
    }
    return numFormat
  }

  _shortDay(dayOfTheWeek) {
    let { name, calendar } = this.culture
    let names =
      shortNames[name] || (shortNames[name] = calendar.days.namesShort.slice())

    return names[dayOfTheWeek.getDay()]
  }
  _formatDate(value, format) {
    return this.g.format(value, format, this.culture)
  }
  _formatNumber(value, format) {
    return this.g.format(value, format, this.culture)
  }

  parseDate(value, format) {
    return this.g.parseDate(value, format, this.culture)
  }
  parseNumber(value) {
    return this.g.parseFloat(value, 10, this.culture)
  }
  decimalChar(format) {
    let data = this.getFormatData(format)
    return data['.'] || super.decimalChar()
  }
  precision(format) {
    let data = this.getFormatData(format)

    if (typeof format === 'string' && format.length > 1)
      return parseFloat(format.substr(1))

    return data ? data.decimals : super.precision()
  }
}
