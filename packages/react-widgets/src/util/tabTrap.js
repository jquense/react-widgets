import { useRef, useEffect } from 'react'

const selector = [
  'input',
  'button:not([tabindex="-1"])',
  '[tabindex="0"]',
].join(',')

export default function useTabTrap(ref) {
  const startedRef = useRef(false)

  function keyHandler(event) {
    if (!ref.current || event.key !== 'Tab') return

    const tabbables = ref.current.querySelectorAll(selector)

    if (event.shiftKey && event.target === tabbables[0]) {
      tabbables[tabbables.length - 1].focus()
      event.preventDefault()
    } else if (
      (!event.shiftKey && event.target === tabbables[tabbables.length - 1]) ||
      !ref.current.contains(event.target)
    ) {
      tabbables[0].focus()
      event.preventDefault()
    }
  }

  useEffect(
    () => () => {
      document.removeEventListener('keydown', keyHandler)
    },
    [startedRef],
  )

  return {
    focus() {
      const tabbables = ref.current?.querySelectorAll(selector)
      tabbables[0]?.focus()
    },
    start() {
      if (!startedRef.current) {
        startedRef.current = true
        document.addEventListener('keydown', keyHandler)
      }
    },
    stop() {
      startedRef.current = false
      document.removeEventListener('keydown', keyHandler)
    },
  }
}
