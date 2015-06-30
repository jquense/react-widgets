'use strict';

var babelHelpers = require('./babelHelpers.js');

var invariant = require('react/lib/invariant');

var _require = require('./_');

var has = _require.has;

var React = require('react');

var REQUIRED_NUMBER_FORMATS = ['default'];

var localePropType = React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]);

var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'dayOfMonth', 'month', 'year', 'decade', 'century'];

function _format(localizer, formatter, value, format, culture) {
  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);

  invariant(result == null || typeof result === 'string', '`localizer format(..)` must return a string, null, or undefined');

  return result;
}

function checkFormats(requiredFormats, formats) {
  if (process.env.NODE_ENV !== 'production') requiredFormats.forEach(function (f) {
    return invariant(has(formats, f), 'localizer missing required format: `%s`', f);
  });
}

var NumberLocalizer = function NumberLocalizer(_ref) {
  var _this = this;

  var format = _ref.format;
  var parse = _ref.parse;
  var precision = _ref.precision;
  var formats = _ref.formats;
  var propType = _ref.propType;
  babelHelpers.classCallCheck(this, NumberLocalizer);

  invariant(typeof format === 'function', 'number localizer `format(..)` must be a function');
  invariant(typeof parse === 'function', 'number localizer `parse(..)` must be a function');

  // invariant(typeof precision === 'function'
  //   , 'number localizer `precision(..)` must be a function')

  checkFormats(REQUIRED_NUMBER_FORMATS, formats);

  this.propType = propType || localePropType;
  this.formats = formats;
  this.precision = precision || function () {
    return null;
  };

  this.format = function (value, str, culture) {
    return _format(_this, format, value, str, culture);
  };

  this.parse = function (value, culture) {
    var result = parse.call(_this, value, culture);

    invariant(result == null || typeof result === 'number', 'number localizer `parse(..)` must return a number, null, or undefined');

    return result;
  };
};

var DateLocalizer = function DateLocalizer(spec) {
  var _this2 = this;

  babelHelpers.classCallCheck(this, DateLocalizer);

  invariant(typeof spec.format === 'function', 'date localizer `format(..)` must be a function');
  invariant(typeof spec.parse === 'function', 'date localizer `parse(..)` must be a function');
  invariant(typeof spec.firstOfWeek === 'function', 'date localizer `firstOfWeek(..)` must be a function');
  checkFormats(REQUIRED_DATE_FORMATS, spec.formats);

  this.propType = spec.propType || localePropType;
  this.formats = spec.formats;
  this.startOfWeek = spec.firstOfWeek;

  this.format = function (value, format, culture) {
    return _format(_this2, spec.format, value, format, culture);
  };

  this.parse = function (value, format, culture) {
    var result = spec.parse.call(_this2, value, format, culture);

    invariant(result == null || result instanceof Date && !isNaN(result.getTime()), 'date localizer `parse(..)` must return a valid Date, null, or undefined');

    return result;
  };
};

module.exports = {
  NumberLocalizer: NumberLocalizer, DateLocalizer: DateLocalizer
};