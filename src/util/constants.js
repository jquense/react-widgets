'use strict';
var _ = require('./_'); //object

var views = {
    MONTH:   'month',
    YEAR:    'year',
    DECADE:  'decade',
    CENTURY: 'century'
  }

module.exports = {

  directions: {
    LEFT:  'LEFT',
    RIGHT: 'RIGHT',
    UP:    'UP',
    DOWN:  'DOWN'
  },

  datePopups: {
    TIME:     'time',
    CALENDAR: 'calendar'
  },

  calendarViews: views,

  calendarViewHierarchy: {
    [views.MONTH]:   views.YEAR,
    [views.YEAR]:    views.DECADE,
    [views.DECADE]:  views.CENTURY
  },

  calendarViewUnits: {
    [views.MONTH]:   views.DAY,
    [views.YEAR]:    views.MONTH,
    [views.DECADE]:  views.YEAR,
    [views.CENTURY]: views.DECADE,
  }
}
