import formatWithOptions from 'date-fns/fp/formatWithOptions'
import parseWithOptions from 'date-fns/fp/parseWithOptions'
import addYears from 'date-fns/fp/addYears'
import enUS from 'date-fns/locale/en-US'

import Localizer from 'react-widgets/lib/Localizer'

const endOfDecade = addYears(10)
const endOfCentury = addYears(100)

export const defaultFormats = {
  date: 'P',
  time: 'pp',
  default: 'Pp',
  header: 'MMMM yyyy',
  footer: 'PPPP',
  weekday: 'cccccc',
  dayOfMonth: 'dd',
  month: 'MMM',
  year: 'YYYY',
  decade: (date, l) =>
    `${l.format(date, 'YYYY')} - ${l.format(endOfDecade(date), 'YYYY')}`,
  century: (date, l) =>
    `${l.format(date, 'YYYY')} - ${l.format(endOfCentury(date), 'YYYY')}`,
}

export default class DateFnsLocalizer extends Localizer {
  constructor(locale) {
    super({
      dateFormats: defaultFormats,
    })

    this.locale = locale || enUS
    const { options } = this.locale
    this.firstOfWeek = (options && options.weekStartsOn) || 0
  }

  _formatDate(value, format) {
    return formatWithOptions({ locale: this.locale }, format, value)
  }

  parseDate(value, format) {
    const result = parseWithOptions(
      { locale: this.locale },
      new Date(),
      format,
      value
    )
    if (result.toString() === 'Invalid Date') {
      return null
    }
    return result
  }
}
