import dateMath from 'date-arithmetic'
import { date as dateLocalizer } from './localizers'

let dates = Object.assign({}, dateMath, {
  monthsInYear(year) {
    let date = new Date(year, 0, 1)
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => dates.month(date, i))
  },

  firstVisibleDay(date, culture) {
    let firstOfMonth = dates.startOf(date, 'month')
    return dates.startOf(
      firstOfMonth,
      'week',
      dateLocalizer.firstOfWeek(culture)
    )
  },

  lastVisibleDay(date, culture) {
    let endOfMonth = dates.endOf(date, 'month')

    return dates.endOf(endOfMonth, 'week', dateLocalizer.firstOfWeek(culture))
  },

  visibleDays(date, culture) {
    let current = dates.firstVisibleDay(date, culture)
    let last = dates.lastVisibleDay(date, culture)
    let days = []

    while (dates.lte(current, last, 'day')) {
      days.push(current)
      current = dates.add(current, 1, 'day')
    }

    return days
  },

  merge(date, time, defaultDate) {
    if (time == null && date == null) return null

    if (time == null) time = defaultDate || new Date()
    if (date == null) date = defaultDate || new Date()

    date = dates.startOf(date, 'day')
    date = dates.hours(date, dates.hours(time))
    date = dates.minutes(date, dates.minutes(time))
    date = dates.seconds(date, dates.seconds(time))
    return dates.milliseconds(date, dates.milliseconds(time))
  },

  today: () => dates.startOf(new Date(), 'day'),
  tomorrow: () => dates.add(dates.startOf(new Date(), 'day'), 1, 'day'),
})

export default dates
