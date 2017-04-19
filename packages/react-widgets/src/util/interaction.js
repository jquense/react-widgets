
export let widgetEnabled = interactionDecorator(true)

export let widgetEditable = interactionDecorator(false)

function interactionDecorator(disabledOnly) {
  function wrap(method) {
    return function decoratedMethod(...args) {
      let { disabled, readOnly } = this.props;
      disabled = disabled == true || (!disabledOnly && readOnly === true);

      if (!disabled) return method.apply(this, args)
    }
  }

  return function decorate(target, key, desc) {
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
