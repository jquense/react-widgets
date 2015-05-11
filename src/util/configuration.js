var globalize = require('globalize')
  , isGlobalBuild = !!window.ReactWidgets
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

if ( process.env.NODE_ENV !== 'production') {
  var first = true
    , { date, number } = config.locale
    , warned, warn = () => {
        if ( !warned ) {
          warned = true
          console.warn(
            'You cannot change a localizer after the widgets have been initialized. ' +
            'Be sure to set localizers before any require(\'react-widgets\') calls. ' + 
            'see: DOC LINK')
        }
      }

	Object.defineProperties(config.locale, {
    date: {
      get() {
        if ( first) first = false 
        return date
      },
      set(x) {
        if ( !first ) warn()
        date = x
      }
    },
    number: {
      get(){
        if ( first) first = false 
        return number
      },
      set(x) {
        if ( !first ) warn()
        number = x
      }
    }
  })
}