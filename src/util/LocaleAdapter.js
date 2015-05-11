var invariant = require('react/lib/invariant')
var { has } = require('./_')
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

function _format(localizer, formatter, value, format, culture) {
  let result = typeof format === 'function' 
    ? format(value, culture, localizer)
    : formatter(value, format, culture)

  invariant(result == null || typeof result === 'string'
    , '`localizer format(..)` must return a string, null, or undefined')

  return result
}

function checkFormats(requiredFormats, formats){
  if( "production" !== process.env.NODE_ENV)
    requiredFormats.forEach(
      f => invariant(has(formats , f), 'localizer missing required format: `%s`', f ))
}

class NumberLocalizer {

  constructor({ format, parse, formats, propType }){
    invariant(typeof format === 'function'
      , 'number localizer `format(..)` must be a function')
    invariant(typeof parse === 'function'
      , 'number localizer `parse(..)` must be a function')
    checkFormats(REQUIRED_NUMBER_FORMATS, formats)
    
    this.propType = propType || propTypes.LocaleFormat
    this.formats = formats

    this.format = (value, format, culture) => _format(this, spec.format, value, format, culture)

    this.parse = (value, culture) => {
      let result = spec.parse(value, format, culture)

      invariant(result == null || typeof result === 'number'
        , 'number localizer `parse(..)` must return a number, null, or undefined')

      return result
    }
  }
}

class DateLocalizer {

  constructor(spec) {
    invariant(typeof spec.format === 'function'
      , 'date localizer `format(..)` must be a function')
    invariant(typeof spec.parse === 'function'
      , 'date localizer `parse(..)` must be a function')
    invariant(typeof spec.firstOfWeek === 'function'
      , 'date localizer `firstOfWeek(..)` must be a function')
    checkFormats(REQUIRED_DATE_FORMATS, spec.formats)

    this.propType = spec.propType || propTypes.LocaleFormat
    this.formats  = spec.formats

    this.startOfWeek = spec.firstOfWeek
    
    this.format = (value, format, culture) => _format(this, spec.format, value, format, culture)

    this.parse = (value, culture) => {
      let result = spec.parse(value, culture)

      invariant(result == null 
        || (result instanceof Date && !isNaN(result.getTime()))
        , 'date localizer `parse(..)` must return a valid Date, null, or undefined')

      return result
    }
  }
}


module.exports = {
  NumberLocalizer, DateLocalizer
}