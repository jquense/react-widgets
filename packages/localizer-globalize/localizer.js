import Globalize from 'globalize'
import PropTypes from 'prop-types'
import configure from 'react-widgets/lib/configure'

function endOfDecade(date) {
  date = new Date(date)
  date.setFullYear(date.getFullYear() + 10)
  date.setMilliseconds(date.getMilliseconds() - 1)
  return date
}

function endOfCentury(date) {
  date = new Date(date)
  date.setFullYear(date.getFullYear() + 100)
  date.setMilliseconds(date.getMilliseconds() - 1)
  return date
}

export default function globalizeLocalizer(options) {
  let localizers =
    Globalize.locale && !Globalize.cultures
      ? newGlobalize(Globalize, options || {})
      : oldGlobalize(Globalize)

  configure.setLocalizers(localizers)
  return localizers
}

function newGlobalize(globalize) {
  function locale(culture) {
    return culture ? globalize(culture) : globalize
  }

  var date = {
    formats: {
      date: { date: 'short' },
      time: { time: 'short' },
      default: { datetime: 'medium' },
      header: { raw: 'MMMM yyyy' },
      footer: { date: 'full' },
      weekday: { raw: 'eeeeee' },
      dayOfMonth: { raw: 'd' },
      month: { raw: 'MMM' },
      year: { raw: 'yyyy' },

      decade: (dt, culture, l) =>
        `${l.format(dt, l.formats.year, culture)} - ${l.format(
          endOfDecade(dt),
          l.formats.year,
          culture
        )}`,

      century: (dt, culture, l) =>
        `${l.format(dt, l.formats.year, culture)} - ${l.format(
          endOfCentury(dt),
          l.formats.year,
          culture
        )}`,
    },

    propType: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.func,
    ]),

    firstOfWeek(culture) {
      let date = new Date()
      let localeDay = locale(culture).formatDate(date, { raw: 'e' })

      //cldr-data doesn't seem to be zero based
      localeDay = Math.max(parseInt(localeDay, 10) - 1, 0)

      return Math.abs(date.getDay() - localeDay)
    },

    parse(value, format, culture) {
      format = typeof format === 'string' ? { raw: format } : format
      return locale(culture).parseDate(value, format)
    },

    format(value, format, culture) {
      format = typeof format === 'string' ? { raw: format } : format
      return locale(culture).formatDate(value, format)
    },
  }

  let number = {
    formats: {
      default: { maximumFractionDigits: 0 },
    },

    propType: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    // TODO major bump consistent ordering
    parse(value, culture) {
      return locale(culture).parseNumber(value)
    },

    format(value, format, culture) {
      if (value == null) return value

      if (format && format.currency)
        return locale(culture).formatCurrency(value, format.currency, format)

      return locale(culture).formatNumber(value, format)
    },

    decimalChar(format, culture) {
      let str = locale(culture).formatNumber(1.1, { raw: '0.0' })
      return str[str.length - 2] || '.'
    },

    precision(format) {
      return !format || format.maximumFractionDigits == null
        ? null
        : format.maximumFractionDigits
    },
  }
  return { date, number }
}

function oldGlobalize(oldGlobalize) {
  const shortNames = Object.create(null)

  function getCulture(culture) {
    return culture
      ? oldGlobalize.findClosestCulture(culture)
      : oldGlobalize.culture()
  }

  function firstOfWeek(culture) {
    culture = getCulture(culture)
    return (culture && culture.calendar.firstDay) || 0
  }

  function shortDay(dayOfTheWeek) {
    var culture = getCulture(arguments[1]),
      name = culture.name,
      days = () => culture.calendar.days.namesShort.slice()

    var names = shortNames[name] || (shortNames[name] = days())

    return names[dayOfTheWeek.getDay()]
  }

  var date = {
    formats: {
      date: 'd',
      time: 't',
      default: 'f',
      header: 'MMMM yyyy',
      footer: 'D',
      weekday: shortDay,
      dayOfMonth: '%d',
      month: 'MMM',
      year: 'yyyy',

      decade: (dt, culture, l) =>
        `${l.format(dt, l.formats.year, culture)} - ${l.format(
          endOfDecade(dt),
          l.formats.year,
          culture
        )}`,

      century: (dt, culture, l) =>
        `${l.format(dt, l.formats.year, culture)} - ${l.format(
          endOfCentury(dt),
          l.formats.year,
          culture
        )}`,
    },

    firstOfWeek,

    parse(value, format, culture) {
      return oldGlobalize.parseDate(value, format, culture)
    },

    format(value, format, culture) {
      return oldGlobalize.format(value, format, culture)
    },
  }

  function formatData(format, _culture) {
    var culture = getCulture(_culture),
      numFormat = culture.numberFormat

    if (typeof format === 'string') {
      if (format.indexOf('p') !== -1) numFormat = numFormat.percent
      if (format.indexOf('c') !== -1) numFormat = numFormat.curency
    }

    return numFormat
  }

  var number = {
    formats: {
      default: 'D',
    },

    // TODO major bump consistent ordering
    parse(value, culture) {
      return oldGlobalize.parseFloat(value, 10, culture)
    },

    format(value, format, culture) {
      return oldGlobalize.format(value, format, culture)
    },

    decimalChar(format, culture) {
      var data = formatData(format, culture)
      return data['.'] || '.'
    },

    precision(format, _culture) {
      var data = formatData(format, _culture)

      if (typeof format === 'string' && format.length > 1)
        return parseFloat(format.substr(1))

      return data ? data.decimals : null
    },
  }

  return { date, number }
}
