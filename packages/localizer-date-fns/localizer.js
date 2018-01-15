import configure from 'react-widgets/lib/configure'
import formatWithOptions from 'date-fns/esm/fp/formatWithOptions'
import parse from 'date-fns/esm/fp/parse'
import addYears from 'date-fns/esm/fp/addYears'
import * as locales from 'date-fns/esm/locale'
import pathOr from 'ramda/src/pathOr'

const { enUS } = locales

const endOfDecade = addYears(10)

const endOfCentury = addYears(100)

const getLocale = culture =>
  pathOr(enUS, [culture], locales)

const format = (date, pattern, culture) =>
  formatWithOptions({ locale: getLocale(culture) }, pattern, date)

const getYear = (date, culture) =>
  format(date, 'YYYY', culture)

const decade = (date, culture) =>
  `${getYear(date, culture)} - ${getYear(endOfDecade(date), culture)}`

const century = (date, culture) =>
  `${getYear(date, culture)} - ${getYear(endOfCentury(date), culture)}`

const firstOfWeek = culture =>
  pathOr(0, ['options', 'weekStartsOn'], getLocale(culture))

export const defaultFormats = {
  date: 'L',
  time: 'LT',
  default: 'lll',
  header: 'MMMM YYYY',
  footer: 'LL',
  weekday: 'dd',
  dayOfMonth: 'DD',
  month: 'MMM',
  year: 'YYYY',
  decade,
  century
}

const dateFnsLocalizer = (formats = defaultFormats) =>
  configure.setDateLocalizer({ formats, firstOfWeek, parse, format })

export default dateFnsLocalizer
