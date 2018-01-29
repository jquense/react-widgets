import formatWithOptions from 'date-fns/fp/formatWithOptions'
import parseWithOptions from 'date-fns/fp/parseWithOptions'
import addYears from 'date-fns/fp/addYears'
import enUS from 'date-fns/locale/en-US'
import configure from 'react-widgets/lib/configure'

const endOfDecade = addYears(10)

const endOfCentury = addYears(100)

function getYear(date, culture, localizer) {
  return localizer.format(date, 'YYYY', culture)
}

function decade(date, culture, localizer) {
  return getYear(date, culture, localizer) + ' - ' + getYear(endOfDecade(date), culture, localizer)
}

function century(date, culture, localizer) {
  return getYear(date, culture, localizer) + ' - ' + getYear(endOfCentury(date), culture, localizer)
}

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
  decade: decade,
  century: century,
}

/**
 * Configures localization of [react-widgets](http://jquense.github.io/react-widgets/) by calling
 * `configure.setDateLocalizer`
 * @static
 * @param {Object} formats Confguration options.
 * @param {string|Object|function} formats.default  the default date display format, generally a "long" format showing
 *   both date and time
 * @param {string|Object|function} formats.date A date only format
 * @param {string|Object|function} formats.time A time only format
 * @param {string|Object|function} formats.header The heading of the Calendar month view, contextualizes the current
 *   month, e.g. "Jan 2014"
 * @param {string|Object|function} formats.footer The Calendar footer format, for displaying Today's date
 * @param {string|Object|function} formats.dayOfMonth The day of the month
 * @param {string|Object|function} formats.month  Month name, used in the Year view of the Calendar
 * @param {string|Object|function} formats.year year format, used in the Decade view of the Calendar
 * @param {string|Object|function} formats.decade a decade format, used in the Century view of the Calendar,
 *  eg. "2010 - 2019"
 * @param {string|Object|function} formats.century  A century format, used the in the Calendar heading
 * @param {Object} locales Supported date-fns locales to include in the bundle
 * @example
 * import dateFnsLocalizer, { defaultFormats } from 'react-widgets-dates'
 * dateFnsLocalizer()
 * // => Works out of the box with default formats (defaultFormats) and the `en-US` locale
 * const newFormats = Object.assign(defaultFormats, { default: 'mmm YY' })
 * dateFnsLocalizer({ formats: newFormats })
 * // => Uses new configuration
 *
 * import locales from 'date-fns/locale'
 * dateFnsLocalizer({ formats: newFormats, locales })
 * // => Includes all available locales
 *
 * import enGB from 'date-fns/locale/en-GB'
 * import de from 'date-fns/locale/de'
 * dateFnsLocalizer({ locales: { 'en-GB': enGB, 'de': de } })
 * // => Include only the locales you need to limit the bundled size
 */
export default function dateFnsLocalizer({ formats = defaultFormats, locales = {} } = {}) {
  function getLocale(culture) {
    return locales[culture] || enUS
  }

  function format(date, pattern, culture) {
    return formatWithOptions({ locale: getLocale(culture) }, pattern, date)
  }

  function parse(date, pattern, culture) {
    return parseWithOptions({ locale: getLocale(culture) }, new Date(), pattern, date)
  }

  function firstOfWeek(culture) {
    const {options} = getLocale(culture)
    return (options && options.weekStartsOn) || 0
  }

  configure.setDateLocalizer({ formats, firstOfWeek, parse, format })
}
