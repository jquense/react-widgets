'use strict';
// thanks http://lodash.com
module.exports = function chunk(array, chunkSize) {
  var index = 0
    , length = array ? array.length : 0
    , result = [];

  chunkSize = Math.max(+chunkSize || 1, 1)

  while (index < length)
    result.push(array.slice(index, (index += chunkSize)))

  return result
}