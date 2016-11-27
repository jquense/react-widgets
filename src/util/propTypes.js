import React, { PropTypes } from 'react';
import localizers from './localizers';

let interactionPropType = (...args) => PropTypes.bool(...args);

interactionPropType.acceptsArray = PropTypes.oneOfType([
  interactionPropType,
  PropTypes.array
])

export default {

  elementType: createChainableTypeChecker(
    function (props, propName, componentName) {

      if( typeof props[propName] !== 'function'){
        if ( React.isValidElement(props[propName]))
          return new Error(
            'Invalid prop `' + propName + '` specified in  `' + componentName + '`.' +
            ' Expected an Element `type`, not an actual Element')

        if (typeof props[propName] !== 'string')
          return new Error(
            'Invalid prop `' + propName + '` specified in  `' + componentName + '`.' +
            ' Expected an Element `type` such as a tag name or return value of React.createClass(...)')
      }
      return null
    }),

  numberFormat: createChainableTypeChecker(
    (...args) => localizers.number.propType(...args)),

  dateFormat: createChainableTypeChecker(
    (...args) => localizers.date.propType(...args)),

  disabled: interactionPropType,
  readOnly: interactionPropType,

  accessor:     React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.func
                  ]),

  message:      React.PropTypes.oneOfType([
                  React.PropTypes.node,
                  React.PropTypes.string
                ]),
}


function createChainableTypeChecker(validate) {

  function checkType(isRequired, props, propName, componentName, ...args) {
    componentName = componentName || '<<anonymous>>';
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          'Required prop `' + propName + '` was not specified in  `' + componentName + '`.');
      }
    }
    else
      return validate(props, propName, componentName, ...args);
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType
}
