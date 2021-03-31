import '../../src/scss/styles.scss'

import faker from 'faker'

faker.seed(420)

global.generateNames = function (limit = 100) {
  var arr = new Array(limit)

  for (var i = 0; i < arr.length; i++) {
    var first = faker.name.firstName(),
      last = faker.name.lastName()

    arr[i] = {
      first,
      last,
      id: i + 1,
      fullName: `${first} ${last}`,
    }
  }

  return arr
}
