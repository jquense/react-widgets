'use strict';

var _require = require('./util/localizers');

var NumberLocalizer = _require.NumberLocalizer;
var DateLocalizer = _require.DateLocalizer;

var dates = require('date-arithmetic');

function globalizeDateLocalizer(globalize) {
  var shortNames = Object.create(null);

  function getCulture(culture) {
    return culture ? (localizer.globalize || globalize).findClosestCulture(culture) : (localizer.globalize || globalize).culture();
  }

  function firstOfWeek(culture) {
    culture = getCulture(culture);
    return culture && culture.calendar.firstDay || 0;
  }

  function shortDay(dayOfTheWeek) {
    var culture = getCulture(arguments[1]),
        name = culture.name,
        start = firstOfWeek(culture),
        days = function days() {
      var days = culture.calendar.days.namesShort.slice();
      return start === 0 ? days : days.concat(days.splice(0, start));
    };

    var names = shortNames[name] || (shortNames[name] = days());

    return names[dayOfTheWeek];
  }

  var localizer = new DateLocalizer({

    formats: {
      date: 'd',
      time: 't',
      'default': 'f',
      header: 'MMMM yyyy',
      footer: 'D',
      weekday: shortDay,
      dayOfMonth: 'dd',
      month: 'MMM',
      year: 'yyyy',

      decade: function decade(dt, culture, l) {
        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(dates.endOf(dt, 'decade'), l.formats.year, culture);
      },

      century: function century(dt, culture, l) {
        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(dates.endOf(dt, 'century'), l.formats.year, culture);
      }
    },

    firstOfWeek: firstOfWeek,

    parse: function parse(value, format, culture) {
      return (this.globalize || globalize).parseDate(value, format, culture);
    },

    format: function format(value, _format, culture) {
      return (this.globalize || globalize).format(value, _format, culture);
    }
  });

  // Back-compat cruft, expose the globalize instance so setGlobalizeInstance can mutate it after initialization
  // this works b/c there is no need to change the default prop values
  localizer.globalize = globalize;
  return localizer;
}

function globalizeNumberLocalizer(globalize) {

  function getCulture(culture) {
    return culture ? (localizer.globalize || globalize).findClosestCulture(culture) : (localizer.globalize || globalize).culture();
  }

  var localizer = new NumberLocalizer({

    formats: {
      'default': 'D'
    },

    parse: function parse(value, culture) {
      return (this.globalize || globalize).parseFloat(value, 10, culture);
    },

    format: function format(value, _format2, culture) {
      return (this.globalize || globalize).format(value, _format2, culture);
    },

    precision: function precision(format, _culture) {
      var culture = getCulture(_culture),
          numFormat = culture.numberFormat;

      if (typeof format === 'string') {
        if (format.length > 1) return parseFloat(format.substr(1));

        if (format.indexOf('p') !== -1) numFormat = numFormat.percent;
        if (format.indexOf('c') !== -1) numFormat = numFormat.curency;

        return numFormat.decimals || null;
      }

      return null;
    }
  });

  // see point above
  localizer.globalize = globalize;
  return localizer;
}

module.exports = {
  globalizeNumberLocalizer: globalizeNumberLocalizer, globalizeDateLocalizer: globalizeDateLocalizer
};