function isDisabled(disabled){
  return disabled === true || disabled === 'disabled'
}

function isReadOnly(readOnly){
  return readOnly === true || readOnly === 'readonly'
}

function wrap(method, disabledOnly){
  return function decoratedMethod(...args){
    let { disabled, readOnly } = this.props;

    if (!(isDisabled(disabled) || (!disabledOnly && isReadOnly(readOnly))))
      return method.apply(this, args)
  }
}

export default function disabledOrReadonly(...args){
  let isDecorator = args.length === 3
    , disabledOnly = isDecorator ? false : args[0];

  return isDecorator
    ? decorate(...args) : decorate

  function decorate(target, key, desc){
    if (desc.initializer) {
      let init = desc.initializer
      desc.initializer = ()=> wrap(init(), disabledOnly)
    }
    else desc.value = wrap(desc.value, disabledOnly)
    return desc
  }
}


