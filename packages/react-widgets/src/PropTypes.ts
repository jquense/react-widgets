import * as PropTypes from 'prop-types'

export const elementType = PropTypes.elementType

export let disabled: PropTypes.Validator<boolean> & {
  acceptsArray: PropTypes.Validator<any>
} = Object.assign(
  (...args: [any, any, any, any, any]) => PropTypes.bool(...args),
  {
    acceptsArray: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  },
)

export const accessor = PropTypes.oneOfType([PropTypes.string, PropTypes.func])

export const message = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.string,
  PropTypes.func,
])
