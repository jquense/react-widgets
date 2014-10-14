'use strict';
var React = require('react')
  , _ =  require('lodash');

module.exports = {

  propTypes: {

    disabled:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.oneOf(['disabled'])
                      ]),

    readOnly:       React.PropTypes.oneOfType([
                      React.PropTypes.bool,
                      React.PropTypes.oneOf(['readOnly'])
                    ]),
  },

  _id: function(suffix){
    this._id_ || (this._id_ = _.uniqueId('rw_'))
    return (this.props.id || this._id_)  + suffix
  },

  _maybeHandle: function(handler, disabledOnly){
    var disabled = this.props.disabled === true || this.props.disabled === 'disabled'
      , readOnly = this.props.readOnly === true || this.props.readOnly === 'readonly';

    if ( !(disabled || (!disabledOnly && readOnly)))
      return handler
  },
}