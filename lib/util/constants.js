var _ = require('lodash')

var views = {
    MONTH:   'month',
    YEAR:    'year',
    DECADE:  'decade',
    CENTURY: 'century'
  }

module.exports = {

  directions: mirror({
    LEFT:  null,
    RIGHT: null,
    UP:    null,
    DOWN:  null
  }),

  datePopups: {
    TIME:     'time',
    CALENDAR: 'calendar'
  },

  calendarViews: views,

  calendarViewHierarchy: _.object([
    [views.MONTH,   views.YEAR],
    [views.YEAR,    views.DECADE],
    [views.DECADE,  views.CENTURY]
  ]),

  calendarViewUnits: _.object([
    [views.MONTH,   views.DAY],
    [views.YEAR,    views.MONTH],
    [views.DECADE,  views.YEAR],
    [views.CENTURY, views.DECADE],
  ])
}


function mirror(obj){
  return _.mapValues(obj, function(val, key){
    return key
  })
}