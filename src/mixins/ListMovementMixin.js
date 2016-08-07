import { presets } from '../util/Filter';
import { dataText } from '../util/dataHelpers';
import CustomPropTypes  from '../util/propTypes';
import { isDisabledItem, isReadOnlyItem }  from '../util/interaction';

const EMPTY_VALUE = {};

var isDisabledOrReadonly = (item, props) => isDisabledItem(item, props) || isReadOnlyItem(item, props)

export default {

  propTypes: {
    textField: CustomPropTypes.accessor,
    valueField: CustomPropTypes.accessor,
    disabled: CustomPropTypes.disabled.acceptsArray,
    readOnly: CustomPropTypes.readOnly.acceptsArray
  },

  first() {
    return this.next(EMPTY_VALUE)
  },

  last() {
    let data = this._data()
      , item = data[data.length - 1];

    return isDisabledOrReadonly(item, this.props)
      ? this.prev(item) : item
  },

  prev(item, word){
    var data = this._data()
      , nextIdx = data.indexOf(item)
      , matches = matcher(word, item, this.props.textField);

    if (nextIdx < 0 || nextIdx == null)
      nextIdx = 0

    nextIdx--;

    while (nextIdx > -1 && (isDisabledOrReadonly(data[nextIdx], this.props) || !matches(data[nextIdx])))
      nextIdx--

    return nextIdx >= 0 ? data[nextIdx] : item;
  },

  next(item, word) {
    var data = this._data()
      , nextIdx = data.indexOf(item) + 1
      , len = data.length
      , matches = matcher(word, item, this.props.textField);

    while (nextIdx < len && (isDisabledOrReadonly(data[nextIdx], this.props) || !matches(data[nextIdx])))
      nextIdx++

    return nextIdx < len ? data[nextIdx] : item
  }
}

function matcher(word, item, textField){
  if (!word) return ()=> true

  word = word.toLowerCase()
  return item => presets.startsWith(
      dataText(item, textField).toLowerCase()
    , word
  )
}
