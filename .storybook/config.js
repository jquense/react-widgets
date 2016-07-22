import { configure } from '@kadira/storybook';

import './styles.less';
import Globalize from './configure-globalize-new';

import Chance from 'chance';

let testsContext = require.context('../stories', true, /\.js$/);

configure(() => {
  global.Globalize = Globalize;

  let chance = global.chance = new Chance();

  global.generateNames = function(limit = 100) {
    var arr = new Array(limit)

    for(var i = 0; i < arr.length; i++){
      var first = chance.first()
        , last = chance.last()

      arr[i] = {
        first,
        last,
        id: i + 1,
        fullName: `${first} ${last}`,
      }
    }

    return arr
  }

  testsContext.keys().forEach(testsContext);

}, module);
