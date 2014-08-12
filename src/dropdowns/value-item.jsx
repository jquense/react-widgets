var React = require('react/addons')
  , mergePropsInto = require('../util/transferProps')
  , _ = require('lodash')

module.exports = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  render: function(){
      var value = this.props.value;

      return mergePropsInto(
        _.omit(this.props, 'value'),
        <div>{this._dataText(value)}</div>)
  }
})
