function isDisabled(disabled){
  return disabled === true || disabled === 'disabled'
}

function isReadOnly(readOnly){
  return readOnly === true || readOnly === 'readonly'
}

export default function disabledOrReadonly(...args){
  let isDecorator = args.length === 3
    , disabledOnly = isDecorator ? false : args[0];

  return isDecorator
    ? decorate(...args) : decorate

  function decorate(target, key, desc){
    if (desc.initializer) {
      let init = desc.initializer
      desc.initializer = ()=> wrap(init())
    }
    else desc.value = wrap(desc.value)
    return desc
  }

  function wrap(method){
    return function decoratedMethod(...args){
      let { disabled, readOnly } = this.props;

      if (!(isDisabled(disabled) || (!disabledOnly && isReadOnly(readOnly))))
        return method.apply(this, args)
    }
  }
}
