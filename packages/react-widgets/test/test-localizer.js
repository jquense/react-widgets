import globalize from 'globalize';

import configure from '../src/configure';

export default function testLocalizer() {
  function getCulture(culture){
    return culture ? globalize.findClosestCulture(culture) : globalize.culture()
  }

  function shortDay(dayOfTheWeek, culture) {
    let names = getCulture(culture).calendar.days.namesShort;
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
      decade: 'yyyy',
      century: 'yyyy',
    },

    firstOfWeek(culture) {
      culture = getCulture(culture)
      return (culture && culture.calendar.firstDay) || 0
    },

    parse(value, format, culture){
      return globalize.parseDate(value, format, culture)
    },

    format(value, format, culture){
      return globalize.format(value, format, culture)
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

    parse(value, culture) {
      return globalize.parseFloat(value, 10, culture)
    },

    format(value, format, culture){
      return globalize.format(value, format, culture)
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

  configure.setLocalizers({ date, number })
}
