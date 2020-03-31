import { useEffect, RefObject } from 'react'
import { findDOMNode } from 'react-dom'

/**
 * Do a "hard" set on the aria, so that it's always announced
 * even if the id hasn't changed, this saves us from having to have a different id
 * per item.
 */
export const setActiveDescendant = (
  ref: Element | React.Component | null,
  activeId: string,
  visible: boolean | null | undefined,
) => {
  if (!ref) return
  const node = findDOMNode(ref) as Element
  node.removeAttribute('aria-activedescendant')
  if (visible) node.setAttribute('aria-activedescendant', activeId)
}

export const useActiveDescendant = (
  ref: RefObject<Element | React.Component>,
  id: string,
  visible: boolean | null | undefined,
  deps: any[],
) => {
  useEffect(() => {
    setActiveDescendant(ref.current, id, visible)
  }, [visible, ...deps])
}
