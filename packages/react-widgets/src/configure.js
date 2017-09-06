import * as localizers from './util/localizers';

export default {
  setLocalizers({ date, number }) {
    date && this.setDateLocalizer(date)
    number && this.setNumberLocalizer(number)
  },

  setDateLocalizer: localizers.setDate,
  setNumberLocalizer: localizers.setNumber
}
