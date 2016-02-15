import configure from '../configure'

export default function(moment) {
  if (typeof moment !== 'function')
    throw new TypeError('You must provide a valid moment object')

  var localField = typeof moment().locale === 'function' ? 'locale' : 'lang'
    , hasLocaleData = !!moment.localeData;

  if (!hasLocaleData)
    throw new TypeError(
      'The Moment localizer depends on the `localeData` api, please provide a moment object v2.2.0 or higher')

  function getMoment(culture, value, format){
    return culture ? moment(value, format)[localField](culture) : moment(value, format)
  }

  function endOfDecade(date) {
    return moment(date).add(10, 'year').add(-1, 'millisecond').toDate()
  }

  function endOfCentury(date) {
    return moment(date).add(100, 'year').add(-1, 'millisecond').toDate()
  }

  let localizer = {
    formats: {
      date: 'L',
      time: 'LT',
      default: 'lll',
      header: 'MMMM YYYY',
      footer: 'LL',
      weekday: 'dd',
      dayOfMonth: 'DD',
      month: 'MMM',
      year: 'YYYY',

      decade(date, culture, localizer) {
        return localizer.format(date, 'YYYY', culture)
          + ' - ' + localizer.format(endOfDecade(date), 'YYYY', culture)
      },

      century(date, culture, localizer) {
        return localizer.format(date, 'YYYY', culture)
          + ' - ' + localizer.format(endOfCentury(date), 'YYYY', culture)
      }
    },

    firstOfWeek(culture) {
      return moment.localeData(culture).firstDayOfWeek()
    },

    parse(value, format, culture) {
      if (!value) return null;
      const m = getMoment(culture, value, format);
      if (m.isValid()) return m.toDate();
      return null;
    },

    format(value, format, culture) {
      return getMoment(culture, value).format(format)
    }
  }

  configure.setDateLocalizer(localizer)

  return localizer;
}
