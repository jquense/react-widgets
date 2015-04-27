var globalize = require('globalize')
  , { 
    GlobalizeNumberLocalizer
  , GlobalizeDateLocalizer } = require('./LocaleAdapter')

module.exports = {
  
  globalize: globalize,

  animate: require('./dom/animate'),

  locale: {
    date:   GlobalizeDateLocalizer(globalize),
    number: GlobalizeNumberLocalizer(globalize)
  }
}