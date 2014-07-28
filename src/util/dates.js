var moment = require('moment')
  , _ = require('lodash')

var dates = module.exports = {

  daysOfWeek: function(date, format){
    if (arguments.length === 1){
      format = date
      date = new Date
    }

    date = moment(date)
    format = format || 'dd'

    return _.map(_.range(7), function(i){
      return date.weekday(i).format(format)
    })
  },

  months: function(date, format){
    if (arguments.length === 1){
      format = date
      date = new Date
    }
    date = moment(date)
    format = format || 'MMM'

    return _.map(_.range(12), function(i){
      return date.month(i).format(format)
    })
  },

  monthsInYear: function(year){
    var date = moment()
    
    date.year(year)

    return _.map(_.range(12), function(i){
      return date.month(i).clone()
    })
  },

  firstOfDecade: function(date){
    var m = moment(date)
      , decade = m.year() % 10

    return m.subtract('year', decade)
  },

  lastOfDecade: function(date){
    return dates.firstOfDecade(date).add('year', 9)
  },

  firstOfCentury: function(date){
    var m = moment(date)
      , decade = m.year() % 100

    return m.subtract('year', decade)
  },

  lastOfCentury: function(date){
    return dates.firstOfCentury(date).add('year', 99)
  },

  firstVisibleDay: function(date){
    var firstOfMonth = moment(date).startOf('month')
    return moment(firstOfMonth).startOf('week');
  },

  lastVisibleDay: function(date){
    var endOfMonth = moment(date).endOf('month')
    return moment(endOfMonth).endOf('week');
  },

  visibleDays: function(date){
    var current = dates.firstVisibleDay(date)
      , last = dates.lastVisibleDay(date)
      , days = [];

    while( !current.isAfter(last) ) {
      days.push(current.clone())
      current.add('days', 1)
    }

    return days
  },

  sameMonth: function(dateA, dateB){
    return moment(dateA).isSame(dateB, 'month')
  },

  inRange: function(day, min, max, unit){
    unit = unit || 'day'

    return (day.isAfter(min, unit) || day.isSame(min, unit)) 
      &&  (day.isBefore(max, unit) || day.isSame(max, unit))
  },

  PropTypes: {
    moment: function(props, propName, componentName){
        if ( !moment.isMoment(props[propName]) )
          return new Error("must be a moment object")
    }
  }

}