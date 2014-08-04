var _ =require('lodash')

module.exports = {

  directions: mirror({
    LEFT: null,
    RIGHT: null,
    UP: null,
    DOWN: null
  })
}


function mirror(obj){
  return _.mapValues(obj, function(val, key){
    return key
  })
}