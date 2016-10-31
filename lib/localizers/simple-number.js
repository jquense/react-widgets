'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = simpleNumber;

var _configure = require('../configure');

var _configure2 = _interopRequireDefault(_configure);

var _formatNumberWithString = require('format-number-with-string');

var _formatNumberWithString2 = _interopRequireDefault(_formatNumberWithString);

var _deconstructNumberFormat = require('deconstruct-number-format');

var _deconstructNumberFormat2 = _interopRequireDefault(_deconstructNumberFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  decimal: '.',
  grouping: ','
};

function simpleNumber(options) {
  var _defaults$options = _extends({}, defaults, options),
      decimal = _defaults$options.decimal,
      grouping = _defaults$options.grouping;

  var localizer = {
    formats: {
      default: '-#' + grouping + '##0' + decimal
    },

    // TODO major bump consistent ordering
    parse: function parse(value, culture, format) {
      if (format) {
        var data = (0, _deconstructNumberFormat2.default)(format),
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
      return (0, _formatNumberWithString2.default)(value, _format);
    },
    decimalChar: function decimalChar(format) {
      return format && (0, _deconstructNumberFormat2.default)(format).decimalsSeparator || '.';
    },
    precision: function precision(format) {
      var data = (0, _deconstructNumberFormat2.default)(format);
      return data.maxRight !== -1 ? data.maxRight : null;
    }
  };

  _configure2.default.setNumberLocalizer(localizer);
  return localizer;
}
module.exports = exports['default'];