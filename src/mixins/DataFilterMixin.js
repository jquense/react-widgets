import PropTypes from 'prop-types';
import filters from '../util/filter';
import CustomPropTypes from '../util/propTypes';
import { dataText } from '../util/dataHelpers';

var dflt = f => f === true ? 'startsWith' : f ? f : 'eq'

module.exports = {

    propTypes: {
      data:           PropTypes.array,
      value:          PropTypes.any,
      filter:         CustomPropTypes.filter,
      caseSensitive:  PropTypes.bool,
      minLength:      PropTypes.number
    },

    getDefaultProps(){
      return {
        caseSensitive: false,
        minLength: 1
      }
    },

    filterIndexOf(items, searchTerm){
      var idx = -1
        , matches = typeof this.props.filter === 'function'
            ? this.props.filter
            : getFilter(filters[dflt(this.props.filter)], searchTerm, this);

      if ( !searchTerm || !searchTerm.trim() || (this.props.filter && searchTerm.length < (this.props.minLength || 1)))
        return -1

      items.every( (item, i) => {
        if (matches(item, searchTerm, i))
          return (idx = i), false

        return true
      })

      return idx
    },

    filter(items, searchTerm){
      var matches = typeof this.props.filter === 'string'
            ? getFilter(filters[this.props.filter], searchTerm, this)
            : this.props.filter;

      if ( !matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1))
        return items

      return items.filter(
        (item, idx) => matches(item, searchTerm, idx))
    }
  }


function getFilter(matcher, searchTerm, ctx){
  searchTerm = !ctx.props.caseSensitive
    ? searchTerm.toLowerCase()
    : searchTerm

  return function(item) {
    var val = dataText(item, ctx.props.textField);

    if ( !ctx.props.caseSensitive )
      val = val.toLowerCase();

    return matcher(val, searchTerm)
  }
}
