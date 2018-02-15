import PropTypes from 'prop-types';
import elementType
  from 'prop-types-extra/lib/elementType';
import createChainableTypeChecker
  from 'prop-types-extra/lib/utils/createChainableTypeChecker';

import { date, number } from './localizers';

export { elementType }

export const numberFormat = createChainableTypeChecker(
  (...args) => number.propType(...args))

export const dateFormat = createChainableTypeChecker(
  (...args) => date.propType(...args))

export const disabled = createChainableTypeChecker(
  (...args) => PropTypes.bool(...args));

disabled.acceptsArray = PropTypes.oneOfType([disabled, PropTypes.array])

export const accessor = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
])

export const message = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.string,
  PropTypes.func,
])
