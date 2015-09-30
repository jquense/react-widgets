'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;
exports['default'] = globalizeLocalizers;

var _utilDates = require('./util/dates');

var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

function globalizeLocalizers(globalize) {
  var shortNames = Object.create(null);

  function getCulture(culture) {
    return culture ? globalize.findClosestCulture(culture) : globalize.culture();
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

  var date = {

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
        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(_utilDates2['default'].endOf(dt, 'decade'), l.formats.year, culture);
      },

      century: function century(dt, culture, l) {
        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(_utilDates2['default'].endOf(dt, 'century'), l.formats.year, culture);
      }
    },

    firstOfWeek: firstOfWeek,

    parse: function parse(value, format, culture) {
      return globalize.parseDate(value, format, culture);
    },

    format: function format(value, _format, culture) {
      return globalize.format(value, _format, culture);
    }
  };

  var number = {

    formats: {
      'default': 'D'
    },

    parse: function parse(value, culture) {
      return globalize.parseFloat(value, 10, culture);
    },

    format: function format(value, _format2, culture) {
      return globalize.format(value, _format2, culture);
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
  };

  return { date: date, number: number };
}

module.exports = exports['default'];