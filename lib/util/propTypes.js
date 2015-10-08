'use strict';

var babelHelpers = require('./babelHelpers.js');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _localizers = require('./localizers');

var _localizers2 = babelHelpers.interopRequireDefault(_localizers);

var _filter = require('./filter');

var _filter2 = babelHelpers.interopRequireDefault(_filter);

var filterTypes = Object.keys(_filter2['default']).filter(function (i) {
  return i !== 'filter';
});

function getInteractionPropType(key) {
  var types = [_react.PropTypes.bool, _react.PropTypes.oneOf([key])],
      propType = _react.PropTypes.oneOfType(types);

  propType.acceptsArray = _react.PropTypes.oneOfType(types.concat(_react.PropTypes.array));

  return propType;
}

module.exports = {

  elementType: createChainableTypeChecker(function (props, propName, componentName) {

    if (typeof props[propName] !== 'function') {
      if (_react2['default'].isValidElement(props[propName])) return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type`, not an actual Element');

      if (typeof props[propName] !== 'string') return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type` such as a tag name or return value of React.createClass(...)');
    }
    return null;
  }),

  numberFormat: createChainableTypeChecker(function () {
    var _localizers$number;

    return (_localizers$number = _localizers2['default'].number).propType.apply(_localizers$number, arguments);
  }),

  dateFormat: createChainableTypeChecker(function () {
    var _localizers$date;

    return (_localizers$date = _localizers2['default'].date).propType.apply(_localizers$date, arguments);
  }),

  disabled: getInteractionPropType('disabled'),
  readOnly: getInteractionPropType('readOnly'),

  accessor: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.func]),

  message: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.func, _react2['default'].PropTypes.string]),

  filter: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.func, _react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(filterTypes)])
};

function createChainableTypeChecker(validate) {

  function checkType(isRequired, props, propName, componentName, location) {
    componentName = componentName || '<<anonymous>>';
    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required prop `' + propName + '` was not specified in  `' + componentName + '`.');
      }
    } else return validate(props, propName, componentName, location);
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}