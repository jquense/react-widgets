//import 'typeface-roboto';
import './styles.scss'

import Chance from 'chance'
import { addDecorator, configure } from '@storybook/react'
import decorator from './configure-intl'

let testsContext = require.context('./stories', true, /\.js$/)

addDecorator(decorator)

configure(() => {
  // global.Globalize = Globalize

  let chance = (global.chance = new Chance())

  global.generateNames = function(limit = 100) {
    var arr = new Array(limit)

    for (var i = 0; i < arr.length; i++) {
      var first = chance.first(),
        last = chance.last()

      arr[i] = {
        first,
        last,
        id: i + 1,
        fullName: `${first} ${last}`,
      }
    }

    return arr
  }

  testsContext.keys().forEach(testsContext)
}, module)
