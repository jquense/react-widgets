import PropTypes from 'prop-types';
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

export const accessor = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
])

export const message = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.string,
  PropTypes.func,
])
