import PropTypes from 'prop-types';
import * as CustomPropTypes from './PropTypes';
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
    let pos = a.length - b.length;
    let lastIndex = a.indexOf(b, pos);
    return  lastIndex !== -1 && lastIndex === pos;
  }
}


function normalizeFilterType(type) {
  if (type === false) return null
  if (type === true) return 'startsWith'
  return type || 'eq'
}

function normalizeFilter({ filter, caseSensitive = false, textField }) {
  filter = normalizeFilterType(filter)

  if (typeof filter === 'function' || !filter) {
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
  caseSensitive:  PropTypes.bool,
  minLength: PropTypes.number,
  filter: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
    PropTypes.oneOf(Object.keys(presets))
  ]),
}

export function indexOf(data, { searchTerm = '', ...options }) {
  let { filter, minLength } = normalizeOptions(options);

  if (
    !filter ||
    !searchTerm ||
    !searchTerm.trim() ||
    searchTerm.length < minLength
  )
    return -1

  for (var idx = 0; idx < data.length; idx++)
    if (filter(data[idx], searchTerm, idx)) return idx

  return -1
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

export function suggest(data, { searchTerm = '', ...options }) {
  let { filter, minLength } = normalizeOptions(options);

  if (
    !filter ||
    !searchTerm ||
    !searchTerm.trim() ||
    searchTerm.length < minLength
  )
    return searchTerm

  for (var idx = 0; idx < data.length; idx++)
    if (filter(data[idx], searchTerm, idx)) return data[idx];

  return searchTerm
}
