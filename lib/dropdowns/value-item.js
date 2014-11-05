/** @jsx React.DOM */
var React = require('react')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , _ = require('../util/_')

module.exports = React.createClass({displayName: 'exports',

  mixins: [ require('../mixins/DataHelpersMixin')],

  render: function(){
      var value = this.props.value;

      return mergeIntoProps(
        _.omit(this.props, 'value'),
        React.DOM.div(null, this._dataText(value)))
  }
})
