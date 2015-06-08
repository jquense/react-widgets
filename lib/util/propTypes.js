'use strict';
var React = require('react'),
    localizers = require('./configuration').locale,
    filters = require('./filter');

var filterTypes = Object.keys(filters).filter(function (i) {
  return i !== 'filter';
});

module.exports = {

  elementType: createChainableTypeChecker(function (props, propName, componentName) {

    if (typeof props[propName] !== 'function') {
      if (React.isValidElement(props[propName])) return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type`, not an actual Element');

      if (typeof props[propName] !== 'string') return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type` such as a tag name or return value of React.createClass(...)');
    }
    return true;
  }),

  numberFormat: createChainableTypeChecker(function () {
    var _localizers$number;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_localizers$number = localizers.number).propType.apply(_localizers$number, args);
  }),

  dateFormat: createChainableTypeChecker(function () {
    var _localizers$date;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (_localizers$date = localizers.date).propType.apply(_localizers$date, args);
  }),

  accessor: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),

  message: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string]),

  filter: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.bool, React.PropTypes.oneOf(filterTypes)])
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