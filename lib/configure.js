'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _utilConfiguration = require('./util/configuration');

var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

var _utilLocalizers = require('./util/localizers');

var localizers = babelHelpers.interopRequireWildcard(_utilLocalizers);
exports['default'] = {

  setAnimate: function setAnimate(animatefn) {
    _utilConfiguration2['default'].animate = animatefn;
  },

  setLocalizers: function setLocalizers(_ref) {
    var date = _ref.date;
    var number = _ref.number;

    date && this.setDateLocalizer(date);
    number && this.setNumberLocalizer(number);
  },

  setDateLocalizer: localizers.setDate,

  setNumberLocalizer: localizers.setNumber
};
module.exports = exports['default'];