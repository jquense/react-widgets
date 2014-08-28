

module.exports = {

  DropDownlist:     require('./lib/dropdowns/dropdown-list'),
  Combobox:         require('./lib/dropdowns/combobox'),

  Calendar:         require('./lib/calendar/calendar'),
  DateTimePicker:   require('./lib/pickers/datepicker'),

  NumberPicker:     require('./lib/pickers/numberpicker'),
  Select:           require('./lib/select/select'),

  utils: {
    ReplaceTransitionGroup: require('./lib/common/ReplaceTransitionGroup'),
    SlideTransition:        require('./lib/common/slide-transition'),
  }
}