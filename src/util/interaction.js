import { valueMatcher } from './dataHelpers';

export function isDisabled({ disabled }) {
  return disabled === true || disabled === 'disabled'
}

export function isReadOnly({ readOnly }){
  return readOnly === true || readOnly === 'readOnly'
}

export function isDisabledItem(item, props){
  return isDisabled(props) || contains(item, props.disabled, props.valueField)
}

export function isReadOnlyItem(item, props){
  return isReadOnly(props) || contains(item, props.readOnly, props.valueField)
}

export function contains(item, values, valueField){
  return Array.isArray(values)
      ? values.some(value => valueMatcher(item, value, valueField))
      : valueMatcher(item, values, valueField)
}

export function move(dir, item, props, list) {
  var isDisabledOrReadonly = item => isDisabledItem(item, props) || isReadOnlyItem(item, props)
    , stop = dir === 'next' ? list.last() : list.first()
    , next = list[dir](item);

  while (next !== stop && isDisabledOrReadonly(next))
    next = list[dir](next)

  return isDisabledOrReadonly(next) ? item  : next
}

export let widgetEnabled = interactionDecorator(true)

export let widgetEditable = interactionDecorator(false)


function interactionDecorator(disabledOnly) {
  function wrap(method) {
    return function decoratedMethod(...args) {
      if (
        !(isDisabled(this.props) ||
        (!disabledOnly && isReadOnly(this.props)))
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
