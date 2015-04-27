"use strict";

var dateMath = require("date-arithmetic"),
    config = require("./configuration"),
    _ = require("./_"); //extend

var shortNames = {};

var dates = module.exports = _.assign(dateMath, {
  // wrapper methods for isolating globalize use throughout the lib
  // looking forward towards the 1.0 release
  culture: function (culture) {
    return culture ? config.globalize.findClosestCulture(culture) : config.globalize.culture();
  },

  startOfWeek: function (culture) {
    culture = dates.culture(culture);

    if (!culture || !culture.calendar) return 0;

    return culture.calendar.firstDay || 0;
  },

  parse: function (date, format, culture) {
    if (typeof format === "function") return format(date, culture);

    return config.globalize.parseDate(date, format, culture);
  },

  format: function (date, format, culture) {
    if (typeof format === "function") return format(date, culture);

    return config.globalize.format(date, format, culture);
  },

  //-------------------------------------

  shortDay: function (dayOfTheWeek) {
    var culture = dates.culture(arguments[1]),
        name = typeof culture === "string" ? culture : culture.name;

    var names = shortNames[name] || (shortNames[name] = dates.shortDaysOfWeek(culture));

    return names[dayOfTheWeek];
  },

  shortDaysOfWeek: function (culture) {
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

  monthsInYear: function (year) {
    var months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        date = new Date(year, 0, 1);

    return months.map(function (i) {
      return dates.month(date, i);
    });
  },

  firstOfDecade: function (date) {
    var decade = dates.year(date) % 10;

    return dates.subtract(date, decade, "year");
  },

  lastOfDecade: function (date) {
    return dates.add(dates.firstOfDecade(date), 9, "year");
  },

  firstOfCentury: function (date) {
    var decade = dates.year(date) % 100;
    return dates.subtract(date, decade, "year");
  },

  lastOfCentury: function (date) {
    return dates.add(dates.firstOfCentury(date), 99, "year");
  },

  firstVisibleDay: function (date, culture) {
    var firstOfMonth = dates.startOf(date, "month");
    return dates.startOf(firstOfMonth, "week", dates.startOfWeek(culture));
  },

  lastVisibleDay: function (date, culture) {
    var endOfMonth = dates.endOf(date, "month");
    return dates.endOf(endOfMonth, "week", dates.startOfWeek(culture));
  },

  visibleDays: function (date, culture) {
    var current = dates.firstVisibleDay(date, culture),
        last = dates.lastVisibleDay(date, culture),
        days = [];

    while (dates.lte(current, last, "day")) {
      days.push(current);
      current = dates.add(current, 1, "day");
    }

    return days;
  },

  merge: function (date, time) {
    if (time == null && date == null) return null;

    if (time == null) time = new Date();
    if (date == null) date = new Date();

    date = dates.startOf(date, "day");
    date = dates.hours(date, dates.hours(time));
    date = dates.minutes(date, dates.minutes(time));
    date = dates.seconds(date, dates.seconds(time));
    return dates.milliseconds(date, dates.milliseconds(time));
  },

  sameMonth: function (dateA, dateB) {
    return dates.eq(dateA, dateB, "month");
  },

  today: function () {
    return this.startOf(new Date(), "day");
  },

  yesterday: function () {
    return this.add(this.startOf(new Date(), "day"), -1, "day");
  },

  tomorrow: function () {
    return this.add(this.startOf(new Date(), "day"), 1, "day");
  },

  formats: {
    DAY_OF_MONTH: "dd",
    DAY_NAME_SHORT: null,
    MONTH_NAME_ABRV: "MMM",
    MONTH_YEAR: "MMMM yyyy",
    YEAR: "yyyy",
    FOOTER: "D"
  }

});