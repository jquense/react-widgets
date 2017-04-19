import scrollTo from 'dom-helpers/util/scrollTo';
import { spyOnComponent } from 'react-component-managers';

export default function createScrollManager(
  component,
  getScrollParent = (list) => list.parentNode
) {

  let currentFocused
    , currentVisible
    , cancelScroll;

  let onMove = component.props.onMove;
  let mounted = true;

  spyOnComponent(component, {
    componentWillReceiveProps({ onMove: nextOnMove }) {
      onMove = nextOnMove;
    },
    componentWillUnmount() {
      mounted = false
    }
  })

  return (selected, list, nextFocused) => {
    if (!mounted) return;

    let lastVisible = currentVisible
    let lastItem    = currentFocused
    let shown, changed;

    currentVisible = !(!list.offsetWidth || !list.offsetHeight)
    currentFocused = nextFocused

    changed = lastItem !== nextFocused
    shown   = currentVisible && !lastVisible

    if (shown || (currentVisible && changed)) {
      if (onMove)
        onMove(selected, list, nextFocused)
      else {
        cancelScroll && cancelScroll()
        cancelScroll = scrollTo(
          selected,
          false && getScrollParent(list)
        )
      }
    }
  }
}
