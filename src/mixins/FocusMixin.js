import { notify } from '../util/widgetHelpers';
import { widgetEnabled } from '../util/interaction';
import compat from '../util/compat';

export default function FocusMixin({ willHandle, didHandle }) {
  function handleFocus(inst, focused, event) {
    let handler = inst.props[focused ? 'onFocus' : 'onBlur']

    if (handler && event)
      event.persist()

    if (willHandle && willHandle.call(inst, focused, event) === false)
      return

    inst.setTimeout('focus', () => {
      compat.batchedUpdates(() => {
        if (didHandle) didHandle.call(inst, focused, event)

        if (focused !== inst.state.focused) {
          notify(handler, event)
          if (inst.isMounted())
            inst.setState({ focused })
        }
      })
    })
  }

  return {

    @widgetEnabled
    handleBlur(event) {
      handleFocus(this, false, event)
    },

    @widgetEnabled
    handleFocus(event) {
      handleFocus(this, true, event)
    }
  }
}
