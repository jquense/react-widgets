import { decorateAction } from '@storybook/addon-actions';

export const action = decorateAction([
  args => args.map(arg => stringify(arg))
])


function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), 2)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return '[Circular ~]'
    return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']'
  }

  return function(key, value) {
    if (value && value.preventDefault) return '[Synthetic Event]';

    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}
