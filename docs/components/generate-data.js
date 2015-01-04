'use strict';
var chance = new (require('chance'))

chance.set('lastNames', ['Smith', 'Williams', 'Chang', 'Diaz', 'Morales'])

module.exports = function generateList(len, lastNames){
  var arr = new Array(len)

  for(var i = 0; i < arr.length; i++){
    var first = chance.first(), last = chance.last()
    arr[i] = { id: i + 1, name: `${first} ${last}`, first, last }
  }

  return arr
}
