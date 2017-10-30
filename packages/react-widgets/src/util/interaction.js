import { findDOMNode } from 'react-dom';
import matches from 'dom-helpers/query/matches';

export const isInDisabledFieldset = (inst) => {
  let node
  try {
    node = findDOMNode(inst)
  } catch (err) { /* ignore */ }

  return !!node && matches(node, 'fieldset[disabled] *')
}

export let widgetEnabled = interactionDecorator(true)

export let widgetEditable = interactionDecorator(false)

function interactionDecorator(disabledOnly) {
  function wrap(method) {
    return function decoratedMethod(...args) {
      let { disabled, readOnly } = this.props;

      disabled = (
        isInDisabledFieldset(this) ||
        disabled == true ||
        (!disabledOnly && readOnly === true)
      );

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

import { spyOnComponent } from 'react-component-managers'


export const disabledManager = (component) => {
  let mounted = false;
  let isInFieldSet = false;
  let useCached = false;
  spyOnComponent(component, {
    componentDidMount() {
      mounted = true
      // becasue we can't access a dom node in the first render we need to
      // render again if the component was disabled via a fieldset
      if (isInDisabledFieldset(this))
        this.forceUpdate()
    },
    componentWillUpdate() {
      isInFieldSet = mounted && isInDisabledFieldset(component)
      useCached = mounted;
    },
    componentDidUpdate() {
      useCached = false;
    },
    componentWillUnmount() {
      component = null;
    }
  })

  return () => (
    component.props.disabled === true ||
    (useCached ? isInFieldSet : (mounted && isInDisabledFieldset(component))) ||
    component.props.disabled // return the prop if nothing is true in case it's an array
  )
}
