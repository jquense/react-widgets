'use strict';

var babelHelpers = require('./babelHelpers.js');

exports.__esModule = true;

var _domAnimate = require('./dom/animate');

var _domAnimate2 = babelHelpers.interopRequireDefault(_domAnimate);

function error() {
  throw new Error('[React Widgets] You are attempting to use a widget that requires localization (DateTimePicker, NumberPicker)' + 'but there is no localizer set. In order to use these widgets please install a localizer');
}

var dummy = {
  formats: error,
  parse: error,
  format: error,
  firstOfWeek: error
};

exports['default'] = {

  animate: _domAnimate2['default'],

  locale: {
    date: dummy,
    number: dummy
  }
};
module.exports = exports['default'];