const views = {
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
  TIME: 'time',
  DATE: 'date'
};

export const calendarViews = views;

export const calendarViewUnits = {
  [views.MONTH]:   'day',
  [views.YEAR]:    views.MONTH,
  [views.DECADE]:  views.YEAR,
  [views.CENTURY]: views.DECADE
};
