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

function simpleNumber() {

  var localizer = {
    formats: {
      'default': '-#,##0.'
    },

    parse: function parse(value, format) {
      if (format) {
        var data = _deconstructNumberFormat2['default'](format);

        if (data.negativeLeftPos !== -1) value = value.substr(data.negativeLeftPos + 1);

        if (data.negativeRightPos !== -1) value = value.substring(0, data.negativeRightPos);

        value = value.replace(data.prefix, '').replace(data.suffix, '');

        var halves = value.split(data.decimalChar);

        if (data.integerSeperator) halves[0] = halves[0].replace(new RegExp('\\' + data.integerSeperator, 'g'));

        if (data.decimalsSeparator) halves[1] = halves[1].replace(new RegExp('\\' + data.decimalsSeparator, 'g'));

        value = halves.join(data.decimalChar);
      }
      var number = parseFloat(value);

      return number;
    },

    format: function format(value, _format) {
      return _formatNumberWithString2['default'](value, _format);
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