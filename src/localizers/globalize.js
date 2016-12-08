import { PropTypes } from 'react';
import configure from '../configure'

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


export default function globalizeLocalizers(globalize) {
  let localizers = (globalize.locale && !globalize.cultures)
      ? newGlobalize(globalize)
      : oldGlobalize(globalize)

  configure.setLocalizers(localizers)
  return localizers;
}

function newGlobalize(Globalize){
  let locale = culture => culture ? Globalize(culture) : Globalize;

  let firstDayFormatter = Globalize.dateFormatter({ raw: 'e' });

  var date = {

    formats: {
      date: Globalize.dateFormatter({ date: 'short' }),
      time: Globalize.dateFormatter({ time: 'short' }),
      default: Globalize.dateFormatter({ datetime: 'medium' }),
      header: Globalize.dateFormatter({ raw: 'MMMM yyyy' }),
      footer: Globalize.dateFormatter({ date: 'full' }),
      weekday: Globalize.dateFormatter({ raw: 'eeeeee' }),
      dayOfMonth: Globalize.dateFormatter({ raw: 'dd' }),
      month: Globalize.dateFormatter({ raw: 'MMM' }),
      year: Globalize.dateFormatter({ raw: 'yyyy' }),

      decade: (dt, culture, l) =>
        `${l.format(dt, l.formats.year, culture)} - ${l.format(endOfDecade(dt), l.formats.year, culture)}`,

      century: (dt, culture, l) =>
        `${l.format(dt, l.formats.year, culture)} - ${l.format(endOfCentury(dt), l.formats.year, culture)}`
    },

    propType: PropTypes.oneOfType([
      PropTypes.string, PropTypes.object, PropTypes.func]),

    firstOfWeek(culture) {
      let date = new Date();
      let localeDay = this.format(date, firstDayFormatter, culture);

      //cldr-data doesn't seem to be zero based
      localeDay = Math.max(parseInt(localeDay, 10) - 1, 0)

      return Math.abs(date.getDay() - localeDay)
    },

    parse(value, format, culture){
      format = typeof format === 'string' ? { raw: format } : format;
      return locale(culture).parseDate(value, format)
    },

    format(value, format, culture){
      format = typeof format === 'string' ? { raw: format } : format;
      return locale(culture).formatDate(value, format)
    }
  }

  let decimalCarFormatter = Globalize.numberFormatter({ raw: '0.0' });

  let number = {
    formats: {
      default: Globalize.numberFormatter({ maximumFractionDigits: 0 }),
    },

    propType: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    // TODO major bump consistent ordering
    parse(value, culture) {
      return locale(culture).parseNumber(value)
    },

    format(value, format, culture) {
      if (value == null)
        return value

      if (format && format.currency)
        return locale(culture).formatCurrency(value, format.currency, format)

      return locale(culture).formatNumber(value, format)
    },

    decimalChar(format, culture) {
      let str = this.format(1.1, decimalCarFormatter, culture)
      return str[str.length - 2] || '.'
    },

    precision(format) {
      return !format || format.maximumFractionDigits == null
        ? null : format.maximumFractionDigits
    }
  }
  return { date, number }
}

function oldGlobalize(oldGlobalize) {
  const shortNames = Object.create(null);

  function getCulture(culture){
    return culture
        ? oldGlobalize.findClosestCulture(culture)
        : oldGlobalize.culture()
  }

  function firstOfWeek(culture) {
    culture = getCulture(culture)
    return (culture && culture.calendar.firstDay) || 0
  }

  function shortDay(dayOfTheWeek){
    var culture = getCulture(arguments[1])
      , name = culture.name
      , days = () => culture.calendar.days.namesShort.slice();

    var names = shortNames[name] || (shortNames[name] = days());

    return names[dayOfTheWeek.getDay()];
  }

  var date = {

    formats: {
      date: 'd',
      time: 't',
      default: 'f',
      header: 'MMMM yyyy',
      footer: 'D',
      weekday: shortDay,
      dayOfMonth: 'dd',
      month: 'MMM',
      year: 'yyyy',

      decade: (dt, culture, l) =>
        `${l.format(dt, l.formats.year, culture)} - ${l.format(endOfDecade(dt), l.formats.year, culture)}`,

      century: (dt, culture, l) =>
        `${l.format(dt, l.formats.year, culture)} - ${l.format(endOfCentury(dt), l.formats.year, culture)}`
    },

    firstOfWeek,

    parse(value, format, culture){
      return oldGlobalize.parseDate(value, format, culture)
    },

    format(value, format, culture){
      return oldGlobalize.format(value, format, culture)
    }
  }

  function formatData(format, _culture){
    var culture = getCulture(_culture)
      , numFormat = culture.numberFormat

    if (typeof format === 'string') {
      if (format.indexOf('p') !== -1) numFormat = numFormat.percent
      if (format.indexOf('c') !== -1) numFormat = numFormat.curency
    }

    return numFormat
  }

  var number = {

    formats: {
      default: 'D'
    },

    // TODO major bump consistent ordering
    parse(value, culture) {
      return oldGlobalize.parseFloat(value, 10, culture)
    },

    format(value, format, culture){
      return oldGlobalize.format(value, format, culture)
    },

    decimalChar(format, culture){
      var data = formatData(format, culture)
      return data['.'] || '.'
    },

    precision(format, _culture){
      var data = formatData(format, _culture)

      if (typeof format === 'string' && format.length > 1)
        return parseFloat(format.substr(1))

      return data ? data.decimals : null
    }
  }

  return { date, number }
}
