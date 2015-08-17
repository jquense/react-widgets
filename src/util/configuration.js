import animate from './dom/animate';

function error(){
  throw new Error(
    '[React Widgets] You are attempting to use a widget that requires localization (DateTimePicker, NumberPicker)' +
    'but there is no localizer set. IN order to use these widgets please install a localizer')
}

let dummy = {
  parse: error,
  format:error,
  firstOfWeek: error
}

export default {

  animate,

  locale: {
    date:   dummy,
    number: dummy
  }
}
