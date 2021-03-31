import * as dateMath from 'date-arithmetic'

let dates = Object.assign({}, dateMath, {
  merge(date?: Date | null, time?: Date | null, defaultDate?: Date) {
    if (time == null && date == null) return null

    if (time == null) time = defaultDate || new Date()
    if (date == null) date = defaultDate || new Date()

    date = dates.startOf(date, 'day')
    date = dates.hours(date, dates.hours(time))
    date = dates.minutes(date, dates.minutes(time))
    date = dates.seconds(date, dates.seconds(time))
    return dates.milliseconds(date, dates.milliseconds(time))
  },
})

export default dates
