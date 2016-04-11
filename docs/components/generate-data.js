'use strict';
var chance = new (require('chance'))

chance.set('lastNames', { en: ['Smith', 'Williams', 'Chang', 'Diaz', 'Morales'] })

module.exports = function generateList(len){
  var arr = new Array(len)

  for(var i = 0; i < arr.length; i++){
    var firstName = chance.first(), lastName = chance.last()
    arr[i] = { id: i + 1, name: `${firstName} ${lastName}`, firstName, lastName }
  }

  return arr
}
