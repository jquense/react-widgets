import { useEffect, RefObject } from 'react'

/**
 * Do a "hard" set on the aria, so that it's always announced
 * even if the id hasn't changed, this saves us from having to have a different id
 * per item.
 */
export const setActiveDescendant = (ref: Element | null, activeId: string) => {
  if (!ref) return

  ref.removeAttribute('aria-activedescendant')
  if (activeId) ref.setAttribute('aria-activedescendant', activeId)
}

export const useActiveDescendant = (
  ref: RefObject<Element>,
  id: string,
  visible: boolean | null | undefined,
  deps: any[],
) => {
  useEffect(() => {
    setActiveDescendant(ref.current, visible ? id : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, id, visible, ...deps])
}
