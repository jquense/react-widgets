'use strict';

exports.__esModule = true;

var _configuration = require('./util/configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _localizers = require('./util/localizers');

var localizers = _interopRequireWildcard(_localizers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  setAnimate: function setAnimate(animatefn) {
    _configuration2.default.animate = animatefn;
  },
  setLocalizers: function setLocalizers(_ref) {
    var date = _ref.date,
        number = _ref.number;

    date && this.setDateLocalizer(date);
    number && this.setNumberLocalizer(number);
  },


  setDateLocalizer: localizers.setDate,

  setNumberLocalizer: localizers.setNumber
};
module.exports = exports['default'];