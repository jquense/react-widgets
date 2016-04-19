'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

function GroupHeader(props) {
  var GroupComponent = props.groupComponent;
  var label = props.label;

  return _react2['default'].createElement(
    'li',
    {
      className: props.className,
      id: props.id,
      role: 'separator',
      tabIndex: '-1'
    },
    GroupComponent ? _react2['default'].createElement(GroupComponent, { item: label }) : label
  );
}

GroupHeader.propTypes = {
  className: _react.PropTypes.string,
  groupComponent: _utilPropTypes2['default'].elementType,
  id: _react.PropTypes.string,
  key: _react.PropTypes.string,
  label: _react.PropTypes.string
};

exports['default'] = GroupHeader;
module.exports = exports['default'];