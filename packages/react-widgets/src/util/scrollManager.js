import scrollTo from 'dom-helpers/util/scrollTo'
import { mountManager } from 'react-component-managers'

export default function createScrollManager(
  inst,
  getScrollParent = list => list.parentNode
) {
  let isMounted = mountManager(inst)
  let currentFocused, currentVisible, cancelScroll

  function handleScroll(selected, list, nextFocused) {
    if (!isMounted()) return

    let lastVisible = currentVisible
    let lastItem = currentFocused
    let shown, changed

    currentVisible = !(!list.offsetWidth || !list.offsetHeight)
    currentFocused = nextFocused

    changed = lastItem !== nextFocused
    shown = currentVisible && !lastVisible

    if (shown || (currentVisible && changed)) {
      if (this.props.onMove) this.props.onMove(selected, list, nextFocused)
      else {
        cancelScroll && cancelScroll()
        cancelScroll = scrollTo(selected, false && getScrollParent(list))
      }
    }
  }

  return handleScroll.bind(inst)
}
