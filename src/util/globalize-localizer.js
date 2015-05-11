var { NumberLocalizer, DateLocalizer } = require('./LocaleAdapter')
var dates = require('date-arithmetic')
var propTypes = require('./propTypes')

function GlobalizeDateLocalizer(globalize){
  const shortNames = Object.create(null);

  function getCulture(culture){
    return culture 
        ? globalize.findClosestCulture(culture)
        : globalize.culture()
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

  return new DateLocalizer({

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
        `${l.format(dt, l.formats.year, culture)} - ${l.format(dates.endOf(dt, 'century'), l.formats.year, culture)}`,
    },

    firstOfWeek,

    parse(value, formats, culture){
      return globalize.parseDate(value, formats, culture)
    },

    format(value, format, culture){
      return globalize.format(value, format, culture)
    }
  })
}

function GlobalizeNumberLocalizer(globalize){
  return new NumberLocalizer({

    propType: propType = propTypes.LocaleFormat,

    formats: {
      default: 'D'
    },

    parse(value, culture){
      return globalize.parseFloat(value, 10, culture)
    },

    format(value, format, culture){
      return globalize.format(value, format, culture)
    }
  })
}

module.exports = {
  GlobalizeNumberLocalizer, GlobalizeDateLocalizer
}