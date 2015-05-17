'use strict';

var babelHelpers = require('./babelHelpers.js');

var dateMath = require('date-arithmetic');

var _require = require('./constants');

var directions = _require.directions;
var calendarViewUnits = _require.calendarViewUnits;
var config = require('./configuration');

var shortNames = {};

var isUpOrDown = function isUpOrDown(dir) {
  return dir === directions.UP || dir === directions.DOWN;
};

var dates = module.exports = babelHelpers._extends(dateMath, {
  // wrapper methods for isolating globalize use throughout the lib
  // looking forward towards the 1.0 release
  culture: function culture(_culture) {
    return _culture ? config.globalize.findClosestCulture(_culture) : config.globalize.culture();
  },

  startOfWeek: function startOfWeek(culture) {
    culture = dates.culture(culture);

    if (!culture || !culture.calendar) return 0;

    return culture.calendar.firstDay || 0;
  },

  parse: function parse(date, format, culture) {
    if (typeof format === 'function') return format(date, culture);

    return config.globalize.parseDate(date, format, culture);
  },

  format: function format(date, _format, culture) {
    if (typeof _format === 'function') return _format(date, culture);

    return config.globalize.format(date, _format, culture);
  },

  //-------------------------------------

  shortDay: function shortDay(dayOfTheWeek) {
    var culture = dates.culture(arguments[1]),
        name = typeof culture === 'string' ? culture : culture.name;

    var names = shortNames[name] || (shortNames[name] = dates.shortDaysOfWeek(culture));

    return names[dayOfTheWeek];
  },

  shortDaysOfWeek: function shortDaysOfWeek(culture) {
    var start = dates.startOfWeek(culture),
        days,
        front;

    culture = dates.culture(culture);

    if (culture && culture.calendar) {
      days = culture.calendar.days.namesShort.slice();

      if (start === 0) return days;

      front = days.splice(0, start);
      days = days.concat(front);
      return days;
    }
  },

  monthsInYear: function monthsInYear(year) {
    var months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        date = new Date(year, 0, 1);

    return months.map(function (i) {
      return dates.month(date, i);
    });
  },

  firstOfDecade: function firstOfDecade(date) {
    var decade = dates.year(date) % 10;

    return dates.subtract(date, decade, 'year');
  },

  lastOfDecade: function lastOfDecade(date) {
    return dates.add(dates.firstOfDecade(date), 9, 'year');
  },

  firstOfCentury: function firstOfCentury(date) {
    var decade = dates.year(date) % 100;
    return dates.subtract(date, decade, 'year');
  },

  lastOfCentury: function lastOfCentury(date) {
    return dates.add(dates.firstOfCentury(date), 99, 'year');
  },

  firstVisibleDay: function firstVisibleDay(date, culture) {
    var firstOfMonth = dates.startOf(date, 'month');
    return dates.startOf(firstOfMonth, 'week', dates.startOfWeek(culture));
  },

  lastVisibleDay: function lastVisibleDay(date, culture) {
    var endOfMonth = dates.endOf(date, 'month');
    return dates.endOf(endOfMonth, 'week', dates.startOfWeek(culture));
  },

  visibleDays: function visibleDays(date, culture) {
    var current = dates.firstVisibleDay(date, culture),
        last = dates.lastVisibleDay(date, culture),
        days = [];

    while (dates.lte(current, last, 'day')) {
      days.push(current);
      current = dates.add(current, 1, 'day');
    }

    return days;
  },

  move: function move(date, min, max, unit, direction) {
    var isMonth = unit === 'month',
        isUpOrDown = direction === directions.UP || direction === directions.DOWN,
        rangeUnit = calendarViewUnits[unit],
        addUnit = isMonth && isUpOrDown ? 'week' : calendarViewUnits[unit],
        amount = isMonth || !isUpOrDown ? 1 : 4,
        newDate;

    if (direction === directions.UP || direction === directions.LEFT) amount *= -1;

    newDate = dates.add(date, amount, addUnit);

    return dates.inRange(newDate, min, max, rangeUnit) ? newDate : date;
  },

  merge: function merge(date, time) {
    if (time == null && date == null) return null;

    if (time == null) time = new Date();
    if (date == null) date = new Date();

    date = dates.startOf(date, 'day');
    date = dates.hours(date, dates.hours(time));
    date = dates.minutes(date, dates.minutes(time));
    date = dates.seconds(date, dates.seconds(time));
    return dates.milliseconds(date, dates.milliseconds(time));
  },

  sameMonth: function sameMonth(dateA, dateB) {
    return dates.eq(dateA, dateB, 'month');
  },

  today: function today() {
    return this.startOf(new Date(), 'day');
  },

  yesterday: function yesterday() {
    return this.add(this.startOf(new Date(), 'day'), -1, 'day');
  },

  tomorrow: function tomorrow() {
    return this.add(this.startOf(new Date(), 'day'), 1, 'day');
  },

  formats: {
    DAY_OF_MONTH: 'dd',
    DAY_NAME_SHORT: null,
    MONTH_NAME_ABRV: 'MMM',
    MONTH_YEAR: 'MMMM yyyy',
    YEAR: 'yyyy',
    FOOTER: 'D'
  }

});