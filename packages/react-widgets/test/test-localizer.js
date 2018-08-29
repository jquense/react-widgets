import globalize from 'globalize'

import Localizer from '../src/Localizer'

const yr = 'yyyy'

class TestLocalizer extends Localizer {
  constructor() {
    super({
      dateFormats: {
        date: 'd',
        time: 't',
        datetime: 'f',
        header: 'MMMM yyyy',
        footer: 'D',
        weekday: (day, l) => l._shortDay(day),
        dayOfMonth: '%d',
        month: 'MMM',
        year: yr,
        decade: yr,
        century: yr,
      },
      numberFormats: {
        default: 'd',
      },
    })

    this.g = globalize
    this.culture = this.g.culture()
    this.firstOfWeek = this.culture.calendar.firstDay || 0
  }
  _shortDay(dayOfTheWeek) {
    let { calendar } = this.culture
    return calendar.days.namesShort[dayOfTheWeek.getDay()]
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
}

global.TEST_LOCALIZER = new TestLocalizer()
