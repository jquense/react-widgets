import { useRef } from 'react'
import scrollTo from 'dom-helpers/util/scrollTo'
import useMounted from '@restart/hooks/useMounted'

export default function useScrollManager(
  ref,
  onMove,
  getScrollParent = list => list.parentNode,
) {
  let isMounted = useMounted()
  const stateBagRef = useRef({})

  function handleScroll(selected, list, nextFocused) {
    if (!isMounted()) return

    const stateBag = stateBagRef.current

    let lastVisible = stateBag.currentVisible
    let lastItem = stateBag.currentFocused
    let shown, changed

    stateBag.currentVisible = !(!list.offsetWidth || !list.offsetHeight)
    stateBag.currentFocused = nextFocused

    changed = lastItem !== nextFocused
    shown = stateBag.currentVisible && !lastVisible

    if (shown || (stateBag.currentVisible && changed)) {
      if (onMove) onMove(selected, list, nextFocused)
      else {
        if (stateBag.cancelScroll) stateBag.cancelScroll()
        stateBag.cancelScroll = scrollTo(
          selected,
          false && getScrollParent(list),
        )
      }
    }
  }

  return handleScroll
}
