import configuration from './util/configuration';
import * as localizers from './util/localizers';


export default {

  setAnimate(animatefn) {
    configuration.animate = animatefn
  },

  setLocalizers({ date, number }) {
    date && this.setDateLocalizer(date)
    number && this.setNumberLocalizer(number)
  },

  setDateLocalizer: localizers.setDate,

  setNumberLocalizer: localizers.setNumber
}
