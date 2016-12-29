import React, { PropTypes } from 'react';
import elementType
  from 'react-prop-types/lib/elementType';
import createChainableTypeChecker
  from 'react-prop-types/lib/utils/createChainableTypeChecker';

import localizers from './localizers';


export { elementType }

export const numberFormat = createChainableTypeChecker(
  (...args) => localizers.number.propType(...args))

export const dateFormat = createChainableTypeChecker(
  (...args) => localizers.date.propType(...args))

export const disabled = createChainableTypeChecker(
  (...args) => PropTypes.bool(...args));

disabled.acceptsArray = PropTypes.oneOfType([
  disabled,
  PropTypes.array
])

export const accessor = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.func,
])

export const message = React.PropTypes.oneOfType([
  React.PropTypes.node,
  React.PropTypes.string,
  React.PropTypes.func,
])
