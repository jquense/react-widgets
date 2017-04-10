import invariant from 'invariant';
import { has } from './_';

import PropTypes from 'prop-types';

const localePropType = PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
      ])

const REQUIRED_NUMBER_FORMATS = [ 'default' ];

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
      'century'
    ];

function _format(localizer, formatter, value, format, culture) {
  let result = typeof format === 'function'
    ? format(value, culture, localizer)
    : formatter.call(localizer, value, format, culture)

  invariant(result == null || typeof result === 'string'
    , '`localizer format(..)` must return a string, null, or undefined')

  return result
}

function checkFormats(requiredFormats, formats){
  if( process.env.NODE_ENV !== 'production' )
    requiredFormats.forEach(
      f => invariant(has(formats, f), 'localizer missing required format: `%s`', f ))
}


let _numberLocalizer = createWrapper('NumberPicker')

export function setNumber({ format, parse, decimalChar = () => '.', precision = () => null, formats, propType }) {
  invariant(typeof format === 'function'
    , 'number localizer `format(..)` must be a function')
  invariant(typeof parse === 'function'
    , 'number localizer `parse(..)` must be a function')

  checkFormats(REQUIRED_NUMBER_FORMATS, formats)

  formats.editFormat = formats.editFormat || (str => parseFloat(str));

  _numberLocalizer = {
    formats,
    precision,
    decimalChar,
    propType: propType || localePropType,

    format(value, str, culture){
      return _format(this, format, value, str, culture)
    },

    parse(value, culture, format) {
      let result = parse.call(this, value, culture, format)
      invariant(result == null || typeof result === 'number'
        , 'number localizer `parse(..)` must return a number, null, or undefined')
      return result
    }
  }
}

let _dateLocalizer = createWrapper('DateTimePicker')

export function setDate(spec) {
  invariant(typeof spec.format === 'function'
    , 'date localizer `format(..)` must be a function')
  invariant(typeof spec.parse === 'function'
    , 'date localizer `parse(..)` must be a function')
  invariant(typeof spec.firstOfWeek === 'function'
    , 'date localizer `firstOfWeek(..)` must be a function')
  checkFormats(REQUIRED_DATE_FORMATS, spec.formats)

  _dateLocalizer = {
    formats: spec.formats,
    propType: spec.propType || localePropType,
    startOfWeek: spec.firstOfWeek,
    format(value, str, culture){
      return _format(this, spec.format, value, str, culture)
    },
    parse(value, culture) {
      let result = spec.parse.call(this, value, culture)
      invariant(result == null
        || (result instanceof Date && !isNaN(result.getTime()))
        , 'date localizer `parse(..)` must return a valid Date, null, or undefined')
      return result
    }
  }
}

export let number = {
  propType(...args){ return _numberLocalizer.propType(...args) },
  getFormat(key, format){
    return format || _numberLocalizer.formats[key]
  },
  parse(...args){
    return _numberLocalizer.parse(...args)
  },
  format(...args){
    return _numberLocalizer.format(...args)
  },
  decimalChar(...args){
    return _numberLocalizer.decimalChar(...args)
  },
  precision(...args){
    return _numberLocalizer.precision(...args)
  }
}

export let date = {
  propType(...args){ return _dateLocalizer.propType(...args) },
  getFormat(key, format){
    return format || _dateLocalizer.formats[key]
  },
  parse(...args){
    return _dateLocalizer.parse(...args)
  },
  format(...args){
    return _dateLocalizer.format(...args)
  },
  startOfWeek(...args){
    return _dateLocalizer.startOfWeek(...args)
  }
}

export default { number, date }


function createWrapper(){
  let dummy = {};

  if (process.env.NODE_ENV !== 'production' ) {
    ['formats', 'parse', 'format', 'firstOfWeek', 'precision', 'propType']
      .forEach(name => Object.defineProperty(dummy, name, {
        enumerable: true,
        get(){
          throw new Error(
            '[React Widgets] You are attempting to use a widget that requires localization ' +
            '(Calendar, DateTimePicker, NumberPicker). ' +
            'However there is no localizer set. Please configure a localizer. \n\n' +
            'see http://jquense.github.io/react-widgets/docs/#/i18n for more info.')
        }
      }))
  }
  return dummy
}
