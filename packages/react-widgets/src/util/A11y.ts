import { useEffect, Ref, RefObject } from 'react';
import { findDOMNode } from 'react-dom'

/**
 * Do a "hard" set on the aria, so that it's always announced
 * even if the id hasn't changed, this saves us from having to have a different id
 * per item.
 */
export const setActiveDescendant = (ref: React.Component | null, activeId: string, visible: boolean) => {
  if (!ref)
    return;
  const node = findDOMNode(ref) as Element;
  node.removeAttribute('aria-activedescendant')
  if (visible) node.setAttribute('aria-activedescendant', activeId)
}

export const useActiveDescendant = (ref: RefObject<React.Component>, id: string, visible: boolean, deps: any[]) => {
  useEffect(() => {
    setActiveDescendant(ref.current, id, visible)
  }, [visible, ...deps])
}
