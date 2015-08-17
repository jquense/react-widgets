'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _utilConfiguration = require('./util/configuration');

var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

var _utilLocalizers = require('./util/localizers');

var _utilLocalizers2 = babelHelpers.interopRequireDefault(_utilLocalizers);

var NumberLocalizer = _utilLocalizers2['default'].NumberLocalizer;
var DateLocalizer = _utilLocalizers2['default'].DateLocalizer;
exports['default'] = {

  setAnimate: function setAnimate(animatefn) {
    _utilConfiguration2['default'].animate = animatefn;
  },

  setLocalizers: function setLocalizers(_ref) {
    var date = _ref.date;
    var number = _ref.number;

    this.setDateLocalizer(date);
    this.setNumberLocalizer(number);
  },

  setDateLocalizer: function setDateLocalizer(spec) {
    _utilConfiguration2['default'].locale.date = new DateLocalizer(spec);
  },

  setNumberLocalizer: function setNumberLocalizer(spec) {
    _utilConfiguration2['default'].locale.number = new NumberLocalizer(spec);
  }
};
module.exports = exports['default'];