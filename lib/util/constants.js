"use strict";
var _ = require("./_"); //object

var views = {
  MONTH: "month",
  YEAR: "year",
  DECADE: "decade",
  CENTURY: "century"
};

module.exports = {

  directions: {
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    UP: "UP",
    DOWN: "DOWN"
  },

  datePopups: {
    TIME: "time",
    CALENDAR: "calendar"
  },

  calendarViews: views,

  calendarViewHierarchy: (function () {
    var _calendarViewHierarchy = {};
    _calendarViewHierarchy[views.MONTH] = views.YEAR;
    _calendarViewHierarchy[views.YEAR] = views.DECADE;
    _calendarViewHierarchy[views.DECADE] = views.CENTURY;
    return _calendarViewHierarchy;
  })(),

  calendarViewUnits: (function () {
    var _calendarViewUnits = {};
    _calendarViewUnits[views.MONTH] = views.DAY;
    _calendarViewUnits[views.YEAR] = views.MONTH;
    _calendarViewUnits[views.DECADE] = views.YEAR;
    _calendarViewUnits[views.CENTURY] = views.DECADE;
    return _calendarViewUnits;
  })()
};