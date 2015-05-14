var globalize
  , { 
    GlobalizeNumberLocalizer
  , GlobalizeDateLocalizer } = require('../globalize-localizer')

try {
  globalize = require('globalize')
} catch (err) {
  globalize = {}
  if ( process.env.NODE_ENV !== 'production') {
    var desc = { get(){ 
        throw new Error(
          "Globalize.js is available but is still set as the localization strategy. " +
          "Please include Globalize.js or provide an alternative localization strategy.") 
      }}
    Object.defineProperties(globalize, 
      { format: desc, parseDate: desc, parseFloat: desc, findClosestCulture: desc, culture: desc })
  }
}

console.log('hhhher', globalize)
var config = module.exports = {

  animate: require('./dom/animate'),

  locale: {
    date:   GlobalizeDateLocalizer(globalize),
    number: GlobalizeNumberLocalizer(globalize)
  }
}