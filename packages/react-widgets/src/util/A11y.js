import { useEffect } from 'react'
import { findDOMNode } from 'react-dom'

/**
 * Do a "hard" set on the aria, so that it's always announced
 * even if the id hasn't changed, this saves us from having to have a different id
 * per item.
 */
export const setActiveDescendant = (ref, activeId, visible) => {
  if (!ref) return
  const node = findDOMNode(ref)
  node.removeAttribute('aria-activedescendant')
  if (visible) node.setAttribute('aria-activedescendant', activeId)
}

export const useActiveDescendant = (ref, id, visible, deps) => {
  useEffect(() => {
    setActiveDescendant(ref.current, id, visible)
  }, [visible, ...deps])
}
