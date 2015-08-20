'use strict';
import React from 'react';
import filter from '../util/filter';
import { dataText } from '../util/dataHelpers';

module.exports = {

  propTypes: {
    textField:  React.PropTypes.string
  },

  first() {
    return this._data()[0]
  },

  last() {
    var data = this._data()
    return data[data.length - 1]
  },

  prev(item, word) {
    var textField = this.props.textField
      , data = this._data()
      , idx  = data.indexOf(item)

    if (idx === -1) idx = data.length;

    return word
      ? findPrevInstance(textField,  data, word, idx)
      : --idx < 0 ? data[0] : data[idx]
  },

  next(item, word) {
    var textField = this.props.textField
      , data = this._data()
      , idx  = data.indexOf(item)

    return word
      ? findNextInstance(textField, data, word, idx)
      : ++idx === data.length ? data[data.length - 1] : data[idx]
  }

}

function findNextInstance(textField, data, word, startIndex){
  var matches = filter.startsWith
    , idx = -1
    , len = data.length
    , foundStart, itemText;

  word = word.toLowerCase()

  while (++idx < len){
    foundStart = foundStart || idx > startIndex
    itemText   = foundStart && dataText(data[idx], textField).toLowerCase()

    if( foundStart && matches(itemText, word) )
      return data[idx]
  }
}

function findPrevInstance(textField, data, word, startIndex){
  var matches = filter.startsWith
    , idx = data.length
    , foundStart, itemText;

  word = word.toLowerCase()

  while (--idx >= 0 ){
    foundStart = foundStart || idx < startIndex
    itemText   = foundStart && dataText(data[idx], textField).toLowerCase()

    if( foundStart && matches(itemText, word) )
      return data[idx]
  }
}
