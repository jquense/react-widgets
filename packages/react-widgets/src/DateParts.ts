import { DateTimePartType, Localizer } from './Localization'
import dates from './util/dates'

type DateTimeSort = 'date' | 'time' | 'datetime'

type Meridiem = 'AM' | 'PM'

interface DateTimeValueMap {
  year: number | null
  month: number | null
  date: number | null
  // meridiem: Meridiem
  hours: number | null
  minutes: number | null
  seconds: number | null
  milliseconds: number | null
}

type CompleteTimeParts = {
  [P in keyof DateTimeValueMap]-?: NonNullable<DateTimeValueMap[P]>
}

// type TimePart = keyof TimeParts

// type DateTimeValueMap = keyof TimeParts
//   | 'year'
//   | 'months'
//   | 'day'
//   | 'hour'
//   | 'minute'
//   | 'second'
//   | 'millisecond'

// export type DateTimeValueMap = Record<DateTimeValueParts, number>

const TESTS = {
  hours: /^([1]?[0-9]|2[0-3])$/,
  hours12: /^^(1[0-2]|0?[1-9])$$/,
  minutes: /^([0-5]?\d)$/,
  seconds: /^([0-5]?\d)$/,
  milliseconds: /^(\d{1,3})$/,
}

const dateParts = { era: 1, month: 1, year: 1, weekday: 1, day: 1 }
const timeParts = {
  dayPeriod: 1,
  hour: 1,
  minute: 1,
  second: 1,
  millisecond: 1,
}

function toParts(
  date: Date,
  localizer: Localizer,
  format: any,
  sort: DateTimeSort = 'datetime',
) {
  const parts = localizer.formatDateToParts(date, format)
  switch (sort) {
    case 'datetime':
      return parts
    case 'date':
      return parts.filter(p => dateParts[p.type])
    case 'time':
      return parts.filter(p => timeParts[p.type])
  }
}

const baselineDate = new Date(2016, 4, 15)
const baseParts: DateTimeValueMap = {
  year: 2016,
  month: 4,
  date: 15,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}

export function fromMap({
  year,
  month,
  date,
  hours,
  minutes,
  seconds,
  milliseconds,
}: CompleteTimeParts) {
  return new Date(year, month, date, hours, minutes, seconds, milliseconds)
}

export function fromPartialMap(valueMap: Partial<DateTimeValueMap>) {
  return Object.keys(valueMap).reduce(
    (acc, key: keyof DateTimeValueMap) =>
      baseParts[key] == null ? dates[key](acc, baseParts[key]!) : acc,
    baselineDate,
  )
}

function increment(
  valueMap: DateTimeValueMap,
  part: DateTimePartType,
  amount: number,
) {
  switch (part) {
  }
}
