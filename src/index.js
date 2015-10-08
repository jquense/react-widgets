let configure = require('./configure');

if (process.env.NODE_ENV !== 'production' ) {
  [
    Array.prototype.some,
    Array.prototype.filter,
    Array.prototype.reduce
  ].forEach(method => {
    if (!method) throw new Error(
      'One or more ES5 features is not available to ReactWidgets: http://jquense.github.io/react-widgets/docs/#/getting-started/browser' )
  })
}

module.exports = {
  ...configure,
  DropdownList:     require('./DropdownList'),
  Combobox:         require('./Combobox'),
  Calendar:         require('./Calendar'),
  DateTimePicker:   require('./DateTimePicker'),
  NumberPicker:     require('./NumberPicker'),
  Multiselect:      require('./Multiselect'),
  SelectList:       require('./SelectList'),

  utils: {
    ReplaceTransitionGroup: require('./ReplaceTransitionGroup'),
    SlideTransition:        require('./SlideTransition')
  }
}
