import * as PropTypes from 'prop-types'
import elementType from 'prop-types-extra/lib/elementType'
import createChainableTypeChecker from 'prop-types-extra/lib/utils/createChainableTypeChecker'
import { Validator } from 'react'

export { elementType }

export const numberFormat = createChainableTypeChecker(
  (props, ...args) =>
    props.localizer ? props.localizer.numberPropType(props, ...args) : null
)

export const dateFormat = createChainableTypeChecker(
  (props, ...args) =>
    props.localizer ? props.localizer.datePropType(props, ...args) : null
)

export const disabled = createChainableTypeChecker((...args) =>
  PropTypes.bool(...args)
)

{
  (disabled as any).acceptsArray = PropTypes.oneOfType([disabled as any, PropTypes.array])
}

export const accessor = PropTypes.oneOfType([PropTypes.string, PropTypes.func])

export const message = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.string,
  PropTypes.func,
])

