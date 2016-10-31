'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('../util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dataHelpers = require('../util/dataHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

    propTypes: {
        data: _react2.default.PropTypes.array,
        sort: _propTypes2.default.sort
    },

    sort: function sort(items, searchTerm) {
        var _this = this;

        var compareFunction = typeof this.props.sort === "function" ? this.props.sort : function (itemA, itemB) {
            var dataTextA = (0, _dataHelpers.dataText)(itemA, _this.props.textField);
            var dataTextB = (0, _dataHelpers.dataText)(itemB, _this.props.textField);

            return dataTextA.localeCompare(dataTextB);
        };

        return [].concat(items).sort(function (itemA, itemB) {
            return compareFunction(itemA, itemB, searchTerm);
        });
    }
};