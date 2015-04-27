var invariant = require('react/lib/invariant')
var { has } = require('./_')
var dates = require('date-arithmetic')
var propTypes = require('./propTypes')

const REQUIRED_NUMBER_FORMATS = [ 'default' ]

const REQUIRED_DATE_FORMATS = [
      'default',
      'date',
      'time',
      'header',
      'footer',
      'dayOfMonth',
      'month',
      'year',
      'decade',
      'century']

function _format(ctx, formatter, value, format, culture) {
  let result = typeof format === 'function' 
    ? format(value, culture, ctx)
    : formatter(value, format, culture)

  invariant(result == null || typeof result === 'string'
    , '`format(..)` must return a string')

  return result
}

function checkFormats(requiredFormats, formats){
  if( "production" !== process.env.NODE_ENV)
    requiredFormats.forEach(
      f => invariant(has(formats , f), 'missing required format: `%s`', f ))
}

class NumberLocalizer {

  constructor({ format, parse, formats, propType }){
    invariant(typeof format === 'function', '`format(..)` is a required option, and must be a function')
    invariant(typeof parse === 'function', '`parse(..)` is a required option, and must be a function')
    checkFormats(REQUIRED_NUMBER_FORMATS, formats)
    
    this.propType = propType
    this.formats = formats

    this.format = (value, format, culture) => _format(this, spec.format, value, format, culture)

    this.parse = (value, culture) => {
      let result = spec.parse(value, format, culture)

      invariant(result == null || typeof result === 'number'
        , '`parse(..)` must return a number or nothing')

      return result
    }
  }
}

class DateLocalizer {

  constructor(spec) {
    invariant(typeof spec.format === 'function', '`format(..)` is a required option, and must be a function')
    invariant(typeof spec.parse === 'function', '`parse(..)` is a required option, and must be a function')
    invariant(typeof spec.firstOfWeek === 'function', '`firstOfWeek(..)` is a required option')
    checkFormats(REQUIRED_DATE_FORMATS, spec.formats)

    this.propType = spec.propType || propTypes.LocaleFormat
    this.formats  = spec.formats

    this.startOfWeek = spec.firstOfWeek
    
    this.format = (value, format, culture) => _format(this, spec.format, value, format, culture)

    this.parse = (value, culture) => {
      let result = spec.parse(value, format, culture)

      invariant(result == null 
        || (result instanceof Date && !isNaN(result.getTime()))
        , '`parse(..)` must return a valid Date or nothing')

      return result
    }
  }
}

function GlobalizeDateLocalizer(globalize){
  const shortNames = Object.create(null);

  function getCulture(culture){
    return culture 
        ? globalize.findClosestCulture(culture)
        : globalize.culture()
  }

  function firstOfWeek(culture) {
    culture = getCulture(culture)
    return (culture && culture.calendar.firstDay) || 0
  }

  function shortDay(dayOfTheWeek){
    var culture = getCulture(arguments[1])
      , name = culture.name
      , start = firstOfWeek(culture)
      , days = () => {
          let days = culture.calendar.days.namesShort.slice()
          return start === 0 ? days : days.concat(days.splice(0, start))
        };

    var names = shortNames[name] || (shortNames[name] = days());

    return names[dayOfTheWeek];
  }

  return new DateLocalizer({

    propType: propTypes.LocaleFormat,

    formats: {
      date: 'd',
      time: 't',
      default: 'f',
      header: 'MMMM yyyy',
      footer: 'D',
      weekday: shortDay,
      dayOfMonth: 'dd',
      month: 'MMM',
      year: 'yyyy',

      decade: (dt, culture, l) => 
        `${adapter.format(dt, l.formats.year, culture)} - ${l.format(dates.endOf(dt, 'decade'), l.formats.year, culture)}`,
      
      century: (dt, culture, l) => 
        `${l.format(dt, l.formats.year, culture)} - ${l.format(dates.endOf(dt, 'century'), l.formats.year, culture)}`,
    },

    firstOfWeek,

    parse(value, formats, culture){
      return globalize.parseDate(value, formats, culture)
    },

    format(value, format, culture){
      return globalize.format(value, format, culture)
    }
  })
}

function GlobalizeNumberLocalizer(globalize){
  return new NumberLocalizer({

    propType: propType = propTypes.LocaleFormat,

    formats: {
      default: 'D'
    },

    parse(value, culture){
      return globalize.parseFloat(value, 10, culture)
    },

    format(value, format, culture){
      return globalize.format(value, format, culture)
    }
  })
}

module.exports = {
  NumberLocalizer, DateLocalizer, GlobalizeNumberLocalizer, GlobalizeDateLocalizer
}