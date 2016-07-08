'use strict';
var views = {
    MONTH:   'month',
    YEAR:    'year',
    DECADE:  'decade',
    CENTURY: 'century'
  }

export const directions = {
  LEFT:  'LEFT',
  RIGHT: 'RIGHT',
  UP:    'UP',
  DOWN:  'DOWN'
};

export const datePopups = {
  TIME:     'time',
  CALENDAR: 'calendar'
};

export const calendarViews = views;

export const calendarViewHierarchy = {
  [views.MONTH]:   views.YEAR,
  [views.YEAR]:    views.DECADE,
  [views.DECADE]:  views.CENTURY
}

export const calendarViewUnits = {
  [views.MONTH]:   'day',
  [views.YEAR]:    views.MONTH,
  [views.DECADE]:  views.YEAR,
  [views.CENTURY]: views.DECADE
};
