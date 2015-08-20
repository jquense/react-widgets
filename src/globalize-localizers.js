var { NumberLocalizer, DateLocalizer } = require('./util/localizers')
var dates = require('date-arithmetic')

function globalizeDateLocalizer(globalize){
  const shortNames = Object.create(null);

  function getCulture(culture){
    return culture
        ? (localizer.globalize || globalize).findClosestCulture(culture)
        : (localizer.globalize || globalize).culture()
  }

  function firstOfWeek(culture) {
    culture = getCulture(culture)
    return (culture && culture.calendar.firstDay) || 0
  }

  function shortDay(dayOfTheWeek){
    var culture = getCulture(arguments[1])
      , name = culture.name
      , start = firstOfWeek(culture)
      , days = () => {
          let days = culture.calendar.days.namesShort.slice()
          return start === 0 ? days : days.concat(days.splice(0, start))
        };

    var names = shortNames[name] || (shortNames[name] = days());

    return names[dayOfTheWeek];
  }

  var localizer = new DateLocalizer({

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
        `${l.format(dt, l.formats.year, culture)} - ${l.format(dates.endOf(dt, 'decade'), l.formats.year, culture)}`,

      century: (dt, culture, l) =>
        `${l.format(dt, l.formats.year, culture)} - ${l.format(dates.endOf(dt, 'century'), l.formats.year, culture)}`
    },

    firstOfWeek,

    parse(value, format, culture){
      return (this.globalize || globalize).parseDate(value, format, culture)
    },

    format(value, format, culture){
      return (this.globalize || globalize).format(value, format, culture)
    }
  })

  // Back-compat cruft, expose the globalize instance so setGlobalizeInstance can mutate it after initialization
  // this works b/c there is no need to change the default prop values
  localizer.globalize = globalize
  return localizer
}

function globalizeNumberLocalizer(globalize) {

  function getCulture(culture){
    return culture
        ? (localizer.globalize || globalize).findClosestCulture(culture)
        : (localizer.globalize || globalize).culture()
  }

  var localizer = new NumberLocalizer({

    formats: {
      default: 'D'
    },

    parse(value, culture){
      return (this.globalize || globalize).parseFloat(value, 10, culture)
    },

    format(value, format, culture){
      return (this.globalize || globalize).format(value, format, culture)
    },

    precision(format, _culture){
      var culture = getCulture(_culture)
        , numFormat = culture.numberFormat

      if ( typeof format === 'string') {
        if ( format.length > 1 )
          return parseFloat(format.substr(1))

        if ( format.indexOf('p') !== -1 ) numFormat = numFormat.percent
        if ( format.indexOf('c') !== -1 ) numFormat = numFormat.curency

        return numFormat.decimals || null
      }

      return null
    }
  })

  // see point above
  localizer.globalize = globalize
  return localizer
}

module.exports = {
  globalizeNumberLocalizer, globalizeDateLocalizer
}
