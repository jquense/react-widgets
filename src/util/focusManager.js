import { notify } from './widgetHelpers';
import { widgetEnabled } from './interaction';
import compat from './compat';

import createTimeoutManager from './timeoutManager';
import createMountManager from './mountManager';

export default function createFocusManager(instance, {
  willHandle,
  didHandle
}) {
  let timeouts = createTimeoutManager(instance);
  let isMounted = createMountManager(instance);

  function handleFocus(inst, focused, event) {
    let handler = inst.props[focused ? 'onFocus' : 'onBlur']

    if (handler && event)
      event.persist()

    if (willHandle && willHandle.call(inst, focused, event) === false)
      return

    timeouts.set('focus', () => {
      compat.batchedUpdates(() => {
        if (didHandle)
          didHandle.call(inst, focused, event)

        if (focused !== inst.state.focused) {
          notify(handler, event)

          if (isMounted())
            inst.setState({ focused })
        }
      })
    })
  }

  let methods = {
    @widgetEnabled
    handleBlur(event) {
      handleFocus(this, false, event)
    },

    @widgetEnabled
    handleFocus(event) {
      handleFocus(this, true, event)
    }
  }

  methods.handleBlur = methods.handleBlur.bind(instance)
  methods.handleFocus = methods.handleFocus.bind(instance)

  return methods;
}
