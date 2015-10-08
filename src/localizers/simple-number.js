import configure from '../configure'
import formatNumber from 'format-number-with-string';
import deconstruct from 'deconstruct-number-format';

export default function simpleNumber(){

  let localizer = {
    formats: {
      default: '-#,##0.'
    },

    parse(value, format){
      if (format) {
        let data = deconstruct(format)

        if (data.negativeLeftPos !== -1)
          value = value.substr(data.negativeLeftPos + 1)

        if (data.negativeRightPos !== -1)
          value = value.substring(0, data.negativeRightPos)

        value = value
          .replace(data.prefix, '')
          .replace(data.suffix, '')

        let halves = value.split(data.decimalChar)

        if (data.integerSeperator)
          halves[0] = halves[0].replace(new RegExp('\\' + data.integerSeperator, 'g'))

        if (data.decimalsSeparator)
          halves[1] = halves[1].replace(new RegExp('\\' + data.decimalsSeparator, 'g'))

        value = halves.join(data.decimalChar)
      }
      let number = parseFloat(value)

      return number
    },

    format(value, format){
      return formatNumber(value, format)
    },

    precision(format){
      let data = deconstruct(format)
      return data.maxRight !== -1 ? data.maxRight : null
    }
  }

  configure.setNumberLocalizer(localizer)
  return localizer
}
