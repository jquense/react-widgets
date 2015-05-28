'use strict';
var React = require('react'),
    filters = require('../util/filter'),
    CustomPropTypes = require('../util/propTypes'),
    helper = require('./DataHelpersMixin');

var dflt = function dflt(f) {
  return f === true ? 'startsWith' : f ? f : 'eq';
};

module.exports = {

  propTypes: {
    data: React.PropTypes.array,
    value: React.PropTypes.any,
    filter: CustomPropTypes.filter,
    caseSensitive: React.PropTypes.bool,
    minLength: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      caseSensitive: false,
      minLength: 1
    };
  },

  filterIndexOf: function filterIndexOf(items, searchTerm) {
    var idx = -1,
        matches = typeof this.props.filter === 'function' ? this.props.filter : getFilter(filters[dflt(this.props.filter)], searchTerm, this);

    if (!searchTerm || !searchTerm.trim() || this.props.filter && searchTerm.length < (this.props.minLength || 1)) return -1;

    items.every(function (item, i) {
      if (matches(item, searchTerm, i)) return (idx = i, false);

      return true;
    });

    return idx;
  },

  filter: function filter(items, searchTerm) {
    var matches = typeof this.props.filter === 'string' ? getFilter(filters[this.props.filter], searchTerm, this) : this.props.filter;

    if (!matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1)) return items;

    return items.filter(function (item, idx) {
      return matches(item, searchTerm, idx);
    });
  }
};

function getFilter(matcher, searchTerm, ctx) {
  searchTerm = !ctx.props.caseSensitive ? searchTerm.toLowerCase() : searchTerm;

  return function (item) {
    var val = helper._dataText.call(ctx, item);

    if (!ctx.props.caseSensitive) val = val.toLowerCase();

    return matcher(val, searchTerm);
  };
}