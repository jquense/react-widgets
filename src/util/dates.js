var dateMath = require('./date-math')
  , globalize = require('globalize')
  , _ = require('lodash')

var dates = module.exports = _.extend({}, dateMath, {
  // wrapper methods for isolating globalize use throughout the lib
  // looking forward towards the 1.0 release
  culture: function(){
    return globalize.culture()
  },

  parse: function(date, format, culture){
    return globalize.parseDate(date, format, culture)
  },

  format: function(date, format, culture){
    return globalize.format(date, format, culture)
  },
  //-------------------------------------

  shortDaysOfWeek: function (){
    var culture = dates.culture()

    if (culture && culture.calendar)
      return culture.calendar.days.namesShort
  },

  daysOfWeek: function(date, format){
    if (arguments.length === 1){
      format = date
      date = new Date
    }

    format = format || 'do'

    return _.map(_.range(7), function(i){
      return  dates.format(dateMath.weekday(date, i), format)
    })
  },

  months: function(date, format){
    if (arguments.length === 1){
      format = date
      date = new Date
    }
    format = format || dates.formats.DAY_NAME_ABRV

    return _.map(_.range(12), function(i){
      return dates.format(dateMath.month(date, i), format)
    })
  },

  monthsInYear: function(year){
    var date = new Date(year, 0, 1)
    
    return _.map(_.range(12), function(i){
      return dateMath.month(date, i)
    })
  },

  firstOfDecade: function(date){
    var decade = dateMath.year(date) % 10

    return dateMath.subtract(date, decade, 'year')
  },

  lastOfDecade: function(date){
    return dateMath.add(dates.firstOfDecade(date), 9, 'year')
  },

  firstOfCentury: function(date){
    var decade = dateMath.year(date) % 100
    return dateMath.subtract(date, decade, 'year')
  },

  lastOfCentury: function(date){
    return dateMath.add(dates.firstOfCentury(date), 99, 'year')
  },

  firstVisibleDay: function(date){
    var firstOfMonth = dateMath.startOf(date, 'month')
    return dateMath.startOf(firstOfMonth, 'week');
  },

  lastVisibleDay: function(date){
    var endOfMonth = dateMath.endOf(date, 'month')
    return dateMath.endOf(endOfMonth, 'week');
  },

  visibleDays: function(date){
    var current = dates.firstVisibleDay(date)
      , last = dates.lastVisibleDay(date)
      , days = [];

    while( dateMath.lte(current, last, 'day') ) {
      days.push(current)
      current = dateMath.add(current, 1, 'day')
    }

    return days
  },

  sameMonth: function(dateA, dateB){
    return dateMath.eq(dateA, dateB, 'month')
  },

  inRange: function(day, min, max, unit){
    unit = unit || 'day'

    return dateMath.gte(day, min, unit) 
        && dateMath.lte(day, max, unit)
  },

  formats: {
    DAY_OF_MONTH:    'dd',
    DAY_NAME_SHORT:  null,
    MONTH_NAME_ABRV: 'MMM',
    MONTH_YEAR:      'MMMM yyyy',
    YEAR:            'yyyy'
  }

})


