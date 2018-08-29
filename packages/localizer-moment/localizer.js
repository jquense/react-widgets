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

const yr = 'YYYY'
const defaultDateFormats = {
  date: 'L',
  time: 'LT',
  datetime: 'lll',
  header: 'MMMM YYYY',
  footer: 'LL',
  weekday: 'dd',
  dayOfMonth: 'DD',
  month: 'MMM',
  year: yr,

  decade: (date, l) =>
    `${l.formatDate(date, yr)} - ${l.formatDate(endOfDecade(date), yr)}`,

  century: (date, l) =>
    `${l.formatDate(date, yr)} - ${l.formatDate(endOfCentury(date), yr)}`,
}

export default class MomentLocalizer extends Localizer {
  constructor(moment, { culture, dateFormats = defaultDateFormats }) {
    super({ dateFormats })

    this.m = moment
    this.culture = culture
    this.localField = typeof moment().locale === 'function' ? 'locale' : 'lang'
    this.firstOfWeek = moment.localeData(culture).firstDayOfWeek()
  }

  getMoment(value, format) {
    let moment = this.m(value, format, true)
    if (this.culture) moment = moment[this.localField](this.culture)
    return moment
  }

  _formatDate(value, format) {
    return this.getMoment(value).format(format)
  }

  parseDate(value, format) {
    if (!value) return null
    const m = this.getMoment(value, format)
    if (m.isValid()) return m.toDate()
    return null
  }
}
