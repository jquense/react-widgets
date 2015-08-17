import configuration from './util/configuration';
import localizers from './util/localizers';

let {
    NumberLocalizer
  , DateLocalizer } = localizers

export default {

  setAnimate(animatefn) {
    configuration.animate = animatefn
  },

  setLocalizers({ date, number }) {
    this.setDateLocalizer(date)
    this.setNumberLocalizer(number)
  },

  setDateLocalizer(spec) {
    configuration.locale.date = new DateLocalizer(spec)
  },

  setNumberLocalizer(spec) {
    configuration.locale.number = new NumberLocalizer(spec)
  }
}
