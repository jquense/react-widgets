var { 
    globalizeNumberLocalizer
  , globalizeDateLocalizer } = require('../globalize-localizers')

var globalize;

try {
  globalize = require('globalize')
} catch (err) {
  globalize = {}
  if ( process.env.NODE_ENV !== 'production') {
    var desc = { get(){ 
        throw new Error(
          'Globalize.js is available but is still set as the localization strategy. ' +
          'Please include Globalize.js or provide an alternative localization strategy.') 
      }}
    Object.defineProperties(globalize, 
      { format: desc, parseDate: desc, parseFloat: desc, findClosestCulture: desc, culture: desc })
  }
}

module.exports = {

  animate: require('./dom/animate'),

  locale: {
    date:   globalizeDateLocalizer(globalize),
    number: globalizeNumberLocalizer(globalize)
  }
}