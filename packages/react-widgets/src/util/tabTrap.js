const selector = [
  'input',
  'button:not([tabindex="-1"])',
  '[tabindex="0"]',
].join(',')

export default function tabTrap(element) {
  function keyHandler(event) {
    if (event.key !== 'Tab') return

    const tabbables = element.querySelectorAll(selector)

    if (event.shiftKey && event.target === tabbables[0]) {
      tabbables[tabbables.length - 1].focus()
      event.preventDefault()
    } else if (
      (!event.shiftKey && event.target === tabbables[tabbables.length - 1]) ||
      !element.contains(event.target)
    ) {
      tabbables[0].focus()
      event.preventDefault()
    }
  }

  return {
    start() {
      document.addEventListener('keydown', keyHandler)
    },
    stop() {
      document.removeEventListener('keydown', keyHandler)
    },
  }
}
