import React from 'react';
import PropTypes from 'prop-types';
import localizers from './localizers';
import filters from'./filter';

var filterTypes = Object.keys(filters).filter( i => i !== 'filter')

function getInteractionPropType(key){
  var types = [ PropTypes.bool, PropTypes.oneOf([key]) ]
    , propType = PropTypes.oneOfType(types);

  propType.acceptsArray = PropTypes.oneOfType(types.concat(PropTypes.array))

  return propType
}

module.exports = {

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

  disabled: getInteractionPropType('disabled'),
  readOnly: getInteractionPropType('readOnly'),

  accessor:     PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.func
                  ]),

  message:      PropTypes.oneOfType([
                  PropTypes.node,
                  PropTypes.string
                ]),

  filter:       PropTypes.oneOfType([
                  PropTypes.func,
                  PropTypes.bool,
                  PropTypes.oneOf(filterTypes)
                ])
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
