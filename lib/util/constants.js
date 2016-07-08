'use strict';

exports.__esModule = true;

var _calendarViewHierarch, _calendarViewUnits;

var views = {
  MONTH: 'month',
  YEAR: 'year',
  DECADE: 'decade',
  CENTURY: 'century'
};

var directions = exports.directions = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
  DOWN: 'DOWN'
};

var datePopups = exports.datePopups = {
  TIME: 'time',
  CALENDAR: 'calendar'
};

var calendarViews = exports.calendarViews = views;

var calendarViewHierarchy = exports.calendarViewHierarchy = (_calendarViewHierarch = {}, _calendarViewHierarch[views.MONTH] = views.YEAR, _calendarViewHierarch[views.YEAR] = views.DECADE, _calendarViewHierarch[views.DECADE] = views.CENTURY, _calendarViewHierarch);

var calendarViewUnits = exports.calendarViewUnits = (_calendarViewUnits = {}, _calendarViewUnits[views.MONTH] = 'day', _calendarViewUnits[views.YEAR] = views.MONTH, _calendarViewUnits[views.DECADE] = views.YEAR, _calendarViewUnits[views.CENTURY] = views.DECADE, _calendarViewUnits);