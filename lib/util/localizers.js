'use strict';

var babelHelpers = require('./babelHelpers.js');

exports.__esModule = true;
exports.setNumber = setNumber;
exports.setDate = setDate;

var _invariant = require('invariant');

var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

var _ = require('./_');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var localePropType = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.func]);

var REQUIRED_NUMBER_FORMATS = ['default'];

var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'dayOfMonth', 'month', 'year', 'decade', 'century'];

function _format(localizer, formatter, value, format, culture) {
  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);

  _invariant2['default'](result == null || typeof result === 'string', '`localizer format(..)` must return a string, null, or undefined');

  return result;
}

function checkFormats(requiredFormats, formats) {
  if (process.env.NODE_ENV !== 'production') requiredFormats.forEach(function (f) {
    return _invariant2['default'](_.has(formats, f), 'localizer missing required format: `%s`', f);
  });
}

var _numberLocalizer = createWrapper('NumberPicker');

function setNumber(_ref) {
  var _format2 = _ref.format;
  var _parse = _ref.parse;
  var _ref$decimalChar = _ref.decimalChar;
  var decimalChar = _ref$decimalChar === undefined ? function () {
    return '.';
  } : _ref$decimalChar;
  var _ref$precision = _ref.precision;
  var precision = _ref$precision === undefined ? function () {
    return null;
  } : _ref$precision;
  var formats = _ref.formats;
  var propType = _ref.propType;

  _invariant2['default'](typeof _format2 === 'function', 'number localizer `format(..)` must be a function');
  _invariant2['default'](typeof _parse === 'function', 'number localizer `parse(..)` must be a function');

  checkFormats(REQUIRED_NUMBER_FORMATS, formats);

  formats.editFormat = formats.editFormat || function (str) {
    return parseFloat(str);
  };

  _numberLocalizer = {
    formats: formats,
    precision: precision,
    decimalChar: decimalChar,
    propType: propType || localePropType,

    format: function format(value, str, culture) {
      return _format(this, _format2, value, str, culture);
    },

    parse: function parse(value, culture, format) {
      var result = _parse.call(this, value, culture, format);
      _invariant2['default'](result == null || typeof result === 'number', 'number localizer `parse(..)` must return a number, null, or undefined');
      return result;
    }
  };
}

var _dateLocalizer = createWrapper('DateTimePicker');

function setDate(spec) {
  _invariant2['default'](typeof spec.format === 'function', 'date localizer `format(..)` must be a function');
  _invariant2['default'](typeof spec.parse === 'function', 'date localizer `parse(..)` must be a function');
  _invariant2['default'](typeof spec.firstOfWeek === 'function', 'date localizer `firstOfWeek(..)` must be a function');
  checkFormats(REQUIRED_DATE_FORMATS, spec.formats);

  _dateLocalizer = {
    formats: spec.formats,
    propType: spec.propType || localePropType,
    startOfWeek: spec.firstOfWeek,
    format: function format(value, str, culture) {
      return _format(this, spec.format, value, str, culture);
    },
    parse: function parse(value, culture) {
      var result = spec.parse.call(this, value, culture);
      _invariant2['default'](result == null || result instanceof Date && !isNaN(result.getTime()), 'date localizer `parse(..)` must return a valid Date, null, or undefined');
      return result;
    }
  };
}

var number = {
  propType: function propType() {
    var _numberLocalizer2;

    return (_numberLocalizer2 = _numberLocalizer).propType.apply(_numberLocalizer2, arguments);
  },
  getFormat: function getFormat(key, format) {
    return format || _numberLocalizer.formats[key];
  },
  parse: function parse() {
    var _numberLocalizer3;

    return (_numberLocalizer3 = _numberLocalizer).parse.apply(_numberLocalizer3, arguments);
  },
  format: function format() {
    var _numberLocalizer4;

    return (_numberLocalizer4 = _numberLocalizer).format.apply(_numberLocalizer4, arguments);
  },
  decimalChar: function decimalChar() {
    var _numberLocalizer5;

    return (_numberLocalizer5 = _numberLocalizer).decimalChar.apply(_numberLocalizer5, arguments);
  },
  precision: function precision() {
    var _numberLocalizer6;

    return (_numberLocalizer6 = _numberLocalizer).precision.apply(_numberLocalizer6, arguments);
  }
};

exports.number = number;
var date = {
  propType: function propType() {
    var _dateLocalizer2;

    return (_dateLocalizer2 = _dateLocalizer).propType.apply(_dateLocalizer2, arguments);
  },
  getFormat: function getFormat(key, format) {
    return format || _dateLocalizer.formats[key];
  },
  parse: function parse() {
    var _dateLocalizer3;

    return (_dateLocalizer3 = _dateLocalizer).parse.apply(_dateLocalizer3, arguments);
  },
  format: function format() {
    var _dateLocalizer4;

    return (_dateLocalizer4 = _dateLocalizer).format.apply(_dateLocalizer4, arguments);
  },
  startOfWeek: function startOfWeek() {
    var _dateLocalizer5;

    return (_dateLocalizer5 = _dateLocalizer).startOfWeek.apply(_dateLocalizer5, arguments);
  }
};

exports.date = date;
exports['default'] = { number: number, date: date };

function createWrapper() {
  var dummy = {};

  if (process.env.NODE_ENV !== 'production') {
    ['formats', 'parse', 'format', 'firstOfWeek', 'precision'].forEach(function (name) {
      return Object.defineProperty(dummy, name, {
        enumerable: true,
        get: function get() {
          throw new Error('[React Widgets] You are attempting to use a widget that requires localization ' + '(Calendar, DateTimePicker, NumberPicker). ' + 'However there is no localizer set. Please configure a localizer. \n\n' + 'see http://jquense.github.io/react-widgets/docs/#/i18n for more info.');
        }
      });
    });
  }
  return dummy;
}