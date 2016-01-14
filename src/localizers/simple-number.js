import configure from '../configure'
import formatNumber from 'format-number-with-string';
import deconstruct from 'deconstruct-number-format';

let defaults = {
  decimal: '.',
  grouping: ','
}

export default function simpleNumber(options) {
  let { decimal, grouping } = { ...defaults, ...options }

  let localizer = {
    formats: {
      default: `-#${grouping}##0${decimal}`
    },

    // TODO major bump consistent ordering
    parse(value, culture, format) {
      if (format) {
        let data = deconstruct(format)
          , negative = (data.negativeLeftSymbol && value.indexOf(data.negativeLeftSymbol) !== -1)
                    || (data.negativeRightSymbol && value.indexOf(data.negativeRightSymbol) !== -1)

        value = value
          .replace(data.negativeLeftSymbol, '')
          .replace(data.negativeRightSymbol, '')
          .replace(data.prefix, '')
          .replace(data.suffix, '')

        let halves = value.split(data.decimalChar)

        if (data.integerSeperator)
          halves[0] = halves[0].replace(new RegExp('\\' + data.integerSeperator, 'g'))

        if (data.decimalsSeparator)
          halves[1] = halves[1].replace(new RegExp('\\' + data.decimalsSeparator, 'g'))

        if (halves[1] === '') halves.pop();

        value = halves.join('.')
        value = +value

        if (negative)
          value = -1 * value
      }
      else
        value = parseFloat(value)

      return isNaN(value) ? null : value
    },

    format(value, format) {
      return formatNumber(value, format)
    },

    decimalChar(format) {
      return format && deconstruct(format).decimalsSeparator || '.'
    },

    precision(format) {
      let data = deconstruct(format)
      return data.maxRight !== -1 ? data.maxRight : null
    }
  }

  configure.setNumberLocalizer(localizer)
  return localizer
}
