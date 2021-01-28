const MIN_IN_DAY = 24 * 60

// @ts-expect-error missing defs
const formatter = Intl.DateTimeFormat('en', { timeStyle: 'short' })
const midnight = new Date(1, 16, 1987).getTime()

export function getTimeList() {
  let current = 0
  let minutes = []
  while (current < MIN_IN_DAY) {
    minutes.push({
      minutes: current,
      label: formatter.format(midnight + current * 60 * 1000),
    })
    current += 30
  }
  return minutes
}
