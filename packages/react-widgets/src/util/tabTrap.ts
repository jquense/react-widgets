import { useMemo, useRef } from 'react'
import useEventListener from '@restart/hooks/useEventListener'

const defaultSelector = [
  'input',
  'textarea',
  'select',
  'button:not([tabindex="-1"])',
  '[tabindex="0"]',
].join(',')

const getDocument = () => document

export default function useTabTrap(
  ref: React.RefObject<Element>,
  selector: string = defaultSelector,
) {
  const startedRef = useRef(false)

  useEventListener(getDocument, 'keydown', (event: KeyboardEvent) => {
    if (!startedRef.current || !ref.current || event.key !== 'Tab') {
      return
    }

    const tabbables = ref.current.querySelectorAll<HTMLElement | SVGElement>(
      selector,
    )

    if (event.shiftKey && event.target === tabbables[0]) {
      tabbables[tabbables.length - 1].focus()
      event.preventDefault()
    } else if (
      (!event.shiftKey && event.target === tabbables[tabbables.length - 1]) ||
      !ref.current.contains(event.target as Element)
    ) {
      tabbables[0].focus()
      event.preventDefault()
    }
  })

  return useMemo(
    () => ({
      focus() {
        const tabbables = ref.current!.querySelectorAll<
          HTMLElement | SVGElement
        >(selector)
        const first = tabbables[0]
        if (first) first.focus()
      },
      start() {
        startedRef.current = true
      },
      stop() {
        startedRef.current = false
      },
    }),
    [selector],
  )
}
