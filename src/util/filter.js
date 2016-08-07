import React from 'react';
import CustomPropTypes from './propTypes';
import { dataText } from './dataHelpers';


export let presets = {
  eq:  (a, b) => a === b,
  neq: (a, b) => a !== b,
  gt:  (a, b) => a > b,
  gte: (a, b) => a >= b,
  lt:  (a, b) => a < b,
  lte: (a, b) => a <= b,

  contains: (a, b) => a.indexOf(b) !== -1,

  startsWith: (a, b) => a.lastIndexOf(b, 0) === 0,

  endsWith(a, b) {
    var pos = a.length - b.length
      , lastIndex = a.indexOf(b, pos);

    return  lastIndex !== -1 && lastIndex === pos;
  }
}


function normalizeFilterType(type) {
  if (type === true) return 'startsWith'
  return type || 'eq'
}

function normalizeFilter({ filter, caseSensitive = false, textField }) {
  filter = normalizeFilterType(filter)

  if (typeof filter === 'function') {
    return filter
  }

  filter = presets[filter];

  return (item, searchTerm) => {
    let textValue = dataText(item, textField);

    if (!caseSensitive) {
      textValue = textValue.toLowerCase()
      searchTerm = searchTerm.toLowerCase()
    }

    return filter(textValue, searchTerm)
  }
}

function normalizeOptions(nextOptions) {
  let options = { ...nextOptions };
  options.minLengh = options.minLengh || 0
  options.filter = normalizeFilter(options)
  return options;
}

export let propTypes = {
  textField: CustomPropTypes.accessor,
  caseSensitive:  React.PropTypes.bool,
  minLength: React.PropTypes.number,
  filter: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool,
    React.PropTypes.oneOf(Object.keys(presets))
  ]),
}

export function filterIndexOf(data, { searchTerm = '', ...options }) {
  let { filter, minLength } = normalizeOptions(options);

  var idx = -1

  if (
    !filter ||
    !searchTerm ||
    !searchTerm.trim() ||
    searchTerm.length < minLength
  )
    return -1

  data.every( (item, i) => {
    if (filter(item, searchTerm, i))
      return (idx = i), false

    return true
  })

  return idx
}

export function filter(data, { searchTerm = '', ...options }) {
  let { filter, minLength } = normalizeOptions(options);

  if (
    !filter ||
    !searchTerm ||
    !searchTerm.trim() ||
    searchTerm.length < minLength
  )
    return data

  return data.filter((item, idx) => filter(item, searchTerm, idx))
}
