import dateMath from 'date-arithmetic';
import { directions, calendarViewUnits } from './constants';
import { date as dateLocalizer } from './localizers';


let dates = Object.assign({}, dateMath, {

  monthsInYear(year) {
    let date = new Date(year, 0, 1)
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => dates.month(date, i))
  },

  firstVisibleDay(date, culture){
    let firstOfMonth = dates.startOf(date, 'month')
    return dates.startOf(firstOfMonth, 'week', dateLocalizer.firstOfWeek(culture));
  },

  lastVisibleDay(date, culture) {
    let endOfMonth = dates.endOf(date, 'month')

    return dates.endOf(endOfMonth, 'week', dateLocalizer.firstOfWeek(culture));
  },

  visibleDays(date, culture) {
    let current = dates.firstVisibleDay(date, culture)
    let last = dates.lastVisibleDay(date, culture)
    let days = [];

    while (dates.lte(current, last, 'day') ) {
      days.push(current)
      current = dates.add(current, 1, 'day')
    }

    return days
  },

  move(date, min, max, unit, direction) {
    let isMonth = unit === 'month'
    let isUpOrDown = direction === directions.UP || direction === directions.DOWN
    let rangeUnit = calendarViewUnits[unit]
    let addUnit = isMonth && isUpOrDown ? 'week' : calendarViewUnits[unit]
    let amount = isMonth || !isUpOrDown ? 1 : 4
    let newDate;

    if ( direction === directions.UP || direction === directions.LEFT)
      amount *= -1

    newDate = dates.add(date, amount, addUnit)

    return dates.inRange(newDate, min, max, rangeUnit)
      ? newDate : date
  },

  merge(date, time, defaultDate) {
    if( time == null && date == null)
      return null

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

  inArray(dates, date) {
    if (!dates || dates.length === 0) {
      return false;
    }

    let dateInArray = false;
    dates.forEach(dateFromArray => {
      if (dateFromArray.getDate() === date.getDate() && dateFromArray.getMonth() === date.getMonth() && dateFromArray.getFullYear() === date.getFullYear()) {
        dateInArray =  true;
      }
    });

    return dateInArray;
  }
})

export default dates;
