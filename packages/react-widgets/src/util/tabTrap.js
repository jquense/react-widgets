const selector = [
  'input',
  'button:not([tabindex="-1"])',
  '[tabindex="0"]',
].join(',')

export default function useTabTrap(ref) {
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

  return {
    focus() {
      const tabbables = ref.current?.querySelectorAll(selector)
      tabbables[0]?.focus()
    },
    start() {
      document.addEventListener('keydown', keyHandler)
    },
    stop() {
      document.removeEventListener('keydown', keyHandler)
    },
  }
}
