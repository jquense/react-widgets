

module.exports = {

  DropDownlist:     require('./src/dropdowns/dropdown-list.jsx'),
  Combobox:         require('./src/dropdowns/combobox.jsx'),

  Calendar:         require('./src/calendar/calendar.jsx'),
  DateTimePicker:   require('./src/pickers/datepicker.jsx'),

  NumberPicker:     require('./src/pickers/numberpicker.jsx'),
  Select:           require('./src/select/select.jsx'),

  utils: {
    ReplaceTransitionGroup: require('./src/common/ReplaceTransitionGroup.jsx'),
    SlideTransition:        require('./src/common/slide-transition.jsx'),
  }
}