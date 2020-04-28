import { addDecorator, addParameters } from '@storybook/react'
import { initializeRTL } from 'storybook-addon-rtl'
import addons from '@storybook/addons'
import decorator from '../src/localizers/configure-intl'
import initializeTheme from '../src/addon-theme'

import Chance from 'chance'
import '../src/styles.scss'

initializeRTL()
initializeTheme()

let chance = (global.chance = new Chance())

global.generateNames = function (limit = 100) {
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

addDecorator(decorator)
