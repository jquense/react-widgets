var { NumberLocalizer, DateLocalizer } = require('./util/localizers')
var dates = require('date-arithmetic')
var propTypes = require('./util/propTypes')

function GlobalizeDateLocalizer(globalize){
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
        `${l.format(dt, l.formats.year, culture)} - ${l.format(dates.endOf(dt, 'century'), l.formats.year, culture)}`,
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

function GlobalizeNumberLocalizer(globalize) {
  var localizer = new NumberLocalizer({

    formats: {
      default: 'D'
    },

    parse(value, culture){
      return (this.globalize || globalize).parseFloat(value, 10, culture)
    },

    format(value, format, culture){
      return (this.globalize || globalize).format(value, format, culture)
    }
  })

  // see point above
  localizer.globalize = globalize
  return localizer
}

module.exports = {
  GlobalizeNumberLocalizer, GlobalizeDateLocalizer
}