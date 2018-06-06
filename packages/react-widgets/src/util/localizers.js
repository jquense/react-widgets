import invariant from 'invariant';
import { has } from './_';
import PropTypes from 'prop-types';

const localePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func
])

const REQUIRED_NUMBER_FORMATS = ['default'];

const REQUIRED_DATE_FORMATS = [
  'default',
  'date',
  'time',
  'header',
  'footer',
  'weekday',
  'dayOfMonth',
  'month',
  'year',
  'decade',
  'century'
];


let _numberLocalizer = createWrapper('NumberPicker')
export const number = {
  propType: (...args) => _numberLocalizer.propType(...args),
  getFormat: (key, format) => format || _numberLocalizer.formats[key],

  parse: (...args) => _numberLocalizer.parse(...args),
  format: (...args) => _numberLocalizer.format(...args),
  decimalChar: (...args) => _numberLocalizer.decimalChar(...args),
  precision: (...args) => _numberLocalizer.precision(...args),
}

export function setNumber({
  format,
  parse,
  formats,
  propType = localePropType,
  decimalChar = () => '.',
  precision = () => null,
}) {
  checkFormats(REQUIRED_NUMBER_FORMATS, formats)

  _numberLocalizer = {
    formats,
    precision,
    decimalChar,
    propType,
    format: wrapFormat(format),
    parse(value, culture, format) {
      let result = parse.call(this, value, culture, format)
      invariant(result == null || typeof result === 'number'
        , 'number localizer `parse(..)` must return a number, null, or undefined')
      return result
    }
  }
}

let _dateLocalizer = createWrapper('DateTimePicker')
export const date = {
  propType: (...args) =>  _dateLocalizer.propType(...args),
  getFormat: (key, format) => format || _dateLocalizer.formats[key],

  parse: (...args) => _dateLocalizer.parse(...args),
  format: (...args) => _dateLocalizer.format(...args),
  firstOfWeek: (...args) => _dateLocalizer.firstOfWeek(...args),
}

export function setDate({
  formats,
  format,
  parse,
  firstOfWeek,
  propType = localePropType,
}) {
  checkFormats(REQUIRED_DATE_FORMATS, formats)
  _dateLocalizer = {
    formats,
    propType,
    firstOfWeek,
    format: wrapFormat(format),
    parse(value, format, culture) {
      let result = parse.call(this, value, format, culture)
      invariant(result == null
        || (result instanceof Date && !isNaN(result.getTime()))
        , 'date localizer `parse(..)` must return a valid Date, null, or undefined')
      return result
    }
  }
}

const wrapFormat = (formatter) => function( value, format, culture) {
  let result = typeof format === 'function'
    ? format(value, culture, this)
    : formatter.call(this, value, format, culture)

  invariant(result == null || typeof result === 'string',
    '`localizer format(..)` must return a string, null, or undefined')

  return result
}

function checkFormats(required, formats) {
  if (process.env.NODE_ENV !== 'production')
    required.forEach(f => invariant(has(formats, f),
      'localizer missing required format: `%s`', f))
}

function createWrapper() {
  let dummy = {};
  if (process.env.NODE_ENV !== 'production') {
    ['formats', 'parse', 'format', 'firstOfWeek', 'precision', 'propType']
      .forEach(name => Object.defineProperty(dummy, name, {
        enumerable: true,
        get() {
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
