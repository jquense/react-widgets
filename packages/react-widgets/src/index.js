/* eslint-disable global-require */
import configure from './configure'
import DropdownList from './DropdownList'
import Combobox from './Combobox'
import Calendar from './Calendar'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import DateTimePicker from './DateTimePicker'
import NumberPicker from './NumberPicker'
import Multiselect from './Multiselect'
import SelectList from './SelectList'
import SlideTransitionGroup from  './SlideTransitionGroup'
import SlideDownTransition from  './SlideDownTransition'

const { setLocalizers, setDateLocalizer, setNumberLocalizer } = configure

const utils = {
  SlideTransitionGroup,
  SlideDownTransition,
}

export {
  DropdownList,
  Combobox,
  Calendar,
  DatePicker,
  TimePicker,
  DateTimePicker,
  NumberPicker,
  Multiselect,
  SelectList,
  utils,
  setLocalizers,
  setDateLocalizer,
  setNumberLocalizer,
}

