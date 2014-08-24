var React = require('react')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , _ = require('lodash')

module.exports = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  render: function(){
      var value = this.props.value;

      return mergeIntoProps(
        _.omit(this.props, 'value'),
        <div>{this._dataText(value)}</div>)
  }
})
