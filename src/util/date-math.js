var _ = require('lodash')
  , globalize = require('globalize');

var MILI 		= 'milliseconds'
  , SECONDS = 'seconds'
  , MINUTES = 'minutes'
  , HOURS 	= 'hours'
  , DAY 		= 'day'
  , WEEK 		= 'week'
  , MONTH 	= 'month'
  , YEAR 		= 'year'
  , DECADE  = 'decade'
  , CENTURY = 'century';

// function tick(date){
// 	this.__val__ = date;
// }

var dates = module.exports = {

	add: function(date, num, unit) {
		date = new Date(date)

		if ( unit === MILI ) 
			return dates.milliseconds(date, dates.milliseconds(date) + num)

		else if ( unit === SECONDS ) 
			return dates.seconds(date, dates.seconds(date) + num)

		else if ( unit === MINUTES ) 
			return dates.minutes(date, dates.minutes(date) + num)

		else if ( unit === HOURS ) 
			return dates.hours(date, dates.hours(date) + num)

		else if ( unit === DAY ) 
			return dates.date(date, dates.date(date) + num)
		
		else if ( unit === WEEK )
			return dates.date(date, dates.date(date) + (7 * num)) 

		else if ( unit === MONTH )
			return monthMath(date, num)

		else if ( unit === YEAR )
			return dates.year(date, dates.year(date) + num)

    else if ( unit === DECADE )
      return dates.year(date, dates.year(date) + (num * 10))

    else if ( unit === CENTURY )
      return dates.year(date, dates.year(date) + (num * 100))

		throw new TypeError('Invalid units: "' + unit + '"')
	},

	subtract: function(date, num, unit) {
		return dates.add(date, -num, unit)
	},

	startOf: function(date, unit) {
    var decade, century;

		date = new Date(date)

		switch (unit) {
      case 'century':
      case 'decade':
			case 'year':
          date = dates.month(date, 0);
      case 'month':
          date = dates.date(date, 1);
      case 'week':
      case 'day':
          date = dates.hours(date, 0);
      case 'hours':
          date = dates.minutes(date, 0);
      case 'minutes':
          date = dates.seconds(date, 0);
      case 'seconds':
          date = dates.milliseconds(date, 0);
    }

    if (unit === DECADE) 
      date = dates.subtract(date, dates.year(date) % 10, 'year')
    
    if (unit === CENTURY) 
      date = dates.subtract(date, dates.year(date) % 100, 'year')

    if (unit === WEEK) 
    	date = dates.weekday(date, 0);

    return date
	},


	endOf: function(date, unit){
		date = new Date(date)
		date = dates.startOf(date, unit)
		date = dates.add(date, 1, unit)
		date = dates.subtract(date, 1, MILI)
		return date
	},

	eq: createComparer(function(a, b){
		return a === b
	}),

	gt: createComparer(function(a, b){
		return a > b
	}),

	gte: createComparer(function(a, b){
		return a >= b
	}),

	lt: createComparer(function(a, b){
		return a < b
	}),

	lte: createComparer(function(a, b){
		return a <= b
	}),

  min: function(){
    return _.min(arguments, function(a){
      return +a
    })
  },

  max: function(){
    return _.max(arguments, function(a){
      return +a
    })
  },
  
  inRange: function(day, min, max, unit){
    unit = unit || 'day'

    return dates.gte(day, min, unit) 
        && dates.lte(day, max, unit)
  },

	milliseconds: 	createAccessor('Milliseconds'),
	seconds: 				createAccessor('Seconds'),
	minutes: 				createAccessor('Minutes'),
	hours: 					createAccessor('Hours'),
	day: 						createAccessor('Day'),
	date: 					createAccessor('Date'),
	month: 					createAccessor('Month'),
	year: 					createAccessor('FullYear'),

	weekday: function (date, val) {
        var weekday = (dates.day(date) + 7 - startOfWeek() ) % 7;

        return val == undefined 
	        ? weekday 
	        : dates.add(date, val - weekday, DAY);
    },
}


function monthMath(date, val){
	var current = dates.month(date)
	  , newMonth  = (current + val);

  	date = dates.month(date, newMonth)

  	if (newMonth < 0 ) newMonth = 12 + val
  		
  	//month rollover
  	if ( dates.month(date) !== ( newMonth % 12))
  		date = dates.date(date, 0) //move to last of month

  	return date
}

//LOCALIZATION
function startOfWeek(date){
	var culture = globalize.culture()

	if (!culture || !culture.calendar)
		return 0

	return culture.calendar.firstDay || 0
}


function createAccessor(method){
	method = method.charAt(0).toUpperCase() + method.substr(1)

	return function(date, val){
		if (val === undefined)
			return date['get' + method]()

		date = new Date(date)
		date['set' + method](val)
		return date
	}
}

function createComparer(operator) {

    return function (a, b, unit) {
        return operator(+dates.startOf(a, unit), + dates.startOf(b, unit))
    };
}
