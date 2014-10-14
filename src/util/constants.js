var _ = require('lodash')

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

  calViews: {
    MONTH:   'month',
    YEAR:    'year',
    DECADE:  'decade',
    CENTURY: 'century'
  }
}


function mirror(obj){
  return _.mapValues(obj, function(val, key){
    return key
  })
}