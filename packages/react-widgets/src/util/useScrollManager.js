import * as animationFrame from 'dom-helpers/animationFrame'
import scrollTo from 'dom-helpers/scrollTo'
import { useRef } from 'react'
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
        if (stateBag.id) animationFrame.cancel(stateBag.id)
        stateBag.id = animationFrame.request(() => {
          const { scrollTop } = list
          const listOffset = list.getBoundingClientRect()
          const selectedOffset = selected.getBoundingClientRect()
          const top = selectedOffset.top - listOffset.top + scrollTop
          const bottom = top + selectedOffset.height

          // below the fold
          if (bottom > scrollTop + listOffset.height) {
            list.scrollTop = bottom - listOffset.height
          }
          // above the fold
          else if (top < scrollTop) {
            list.scrollTop = top
          }

          //scrollTo(selected, list)
          // selected.scrollIntoView({ block: 'nearest', inline: 'nearest' })
        })
      }
    }
  }

  return handleScroll
}
