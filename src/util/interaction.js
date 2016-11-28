import { valueMatcher, dataIndexOf } from './dataHelpers';


export function isDisabledItem(item, list, value) {
  return !!(Array.isArray(list)
    ? ~dataIndexOf(list, item, value)
    : list
  )
}


export function contains(item, values, valueField) {
  return Array.isArray(values)
      ? values.some(value => valueMatcher(item, value, valueField))
      : valueMatcher(item, values, valueField)
}

export let widgetEnabled = interactionDecorator(true)

export let widgetEditable = interactionDecorator(false)


function interactionDecorator(disabledOnly) {
  function wrap(method) {
    return function decoratedMethod(...args) {

      if (
        this.props.disabled !== true ||
        (!disabledOnly && this.props.readOnly === true)
      ) {
        return method.apply(this, args)
      }
    }
  }

  return function decorate(target, key, desc){
    if (desc.initializer) {
      let init = desc.initializer

      desc.initializer = function () {
        return wrap(init.call(this)).bind(this)
      }
    }
    else desc.value = wrap(desc.value)
    return desc
  }
}
