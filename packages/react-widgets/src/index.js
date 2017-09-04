/* eslint-disable global-require */
let configure = require('./configure').default;

module.exports = {
  ...configure,
  DropdownList: require('./DropdownList').default,
  Combobox: require('./Combobox').default,
  Calendar: require('./Calendar').default,
  DatePicker: require('./DatePicker').default,
  TimePicker: require('./TimePicker').default,
  DateTimePicker: require('./DateTimePicker').default,
  NumberPicker: require('./NumberPicker').default,
  Multiselect: require('./Multiselect').default,
  SelectList: require('./SelectList').default,

  utils: {
    SlideTransitionGroup: require('./SlideTransitionGroup').default,
    SlideDownTransition: require('./SlideDownTransition').default,
  },
}
