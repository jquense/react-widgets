'use strict';

var babelHelpers = require('../util/babelHelpers.js');

exports.__esModule = true;
exports['default'] = simpleNumber;

var _configure = require('../configure');

var _configure2 = babelHelpers.interopRequireDefault(_configure);

var _formatNumberWithString = require('format-number-with-string');

var _formatNumberWithString2 = babelHelpers.interopRequireDefault(_formatNumberWithString);

var _deconstructNumberFormat = require('deconstruct-number-format');

var _deconstructNumberFormat2 = babelHelpers.interopRequireDefault(_deconstructNumberFormat);

var defaults = {
  decimal: '.',
  grouping: ','
};

function simpleNumber(options) {
  var _babelHelpers$_extends = babelHelpers._extends({}, defaults, options);

  var decimal = _babelHelpers$_extends.decimal;
  var grouping = _babelHelpers$_extends.grouping;

  var localizer = {
    formats: {
      'default': '-#' + grouping + '##0' + decimal
    },

    // TODO major bump consistent ordering
    parse: function parse(value, culture, format) {
      if (format) {
        var data = _deconstructNumberFormat2['default'](format),
            negative = data.negativeLeftSymbol && value.indexOf(data.negativeLeftSymbol) !== -1 || data.negativeRightSymbol && value.indexOf(data.negativeRightSymbol) !== -1;

        value = value.replace(data.negativeLeftSymbol, '').replace(data.negativeRightSymbol, '').replace(data.prefix, '').replace(data.suffix, '');

        var halves = value.split(data.decimalChar);

        if (data.integerSeperator) halves[0] = halves[0].replace(new RegExp('\\' + data.integerSeperator, 'g'));

        if (data.decimalsSeparator) halves[1] = halves[1].replace(new RegExp('\\' + data.decimalsSeparator, 'g'));

        if (halves[1] === '') halves.pop();

        value = halves.join('.');
        value = +value;

        if (negative) value = -1 * value;
      } else value = parseFloat(value);

      return isNaN(value) ? null : value;
    },

    format: function format(value, _format) {
      return _formatNumberWithString2['default'](value, _format);
    },

    decimalChar: function decimalChar(format) {
      return format && _deconstructNumberFormat2['default'](format).decimalsSeparator || '.';
    },

    precision: function precision(format) {
      var data = _deconstructNumberFormat2['default'](format);
      return data.maxRight !== -1 ? data.maxRight : null;
    }
  };

  _configure2['default'].setNumberLocalizer(localizer);
  return localizer;
}

module.exports = exports['default'];