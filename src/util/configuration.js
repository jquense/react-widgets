var globalize = require('globalize')
  , { 
    GlobalizeNumberLocalizer
  , GlobalizeDateLocalizer } = require('./globalize-localizer')

var config = module.exports = {

  animate: require('./dom/animate'),

  locale: {
    date:   GlobalizeDateLocalizer(globalize),
    number: GlobalizeNumberLocalizer(globalize)
  }
}