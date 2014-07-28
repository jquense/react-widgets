var React = require('react')

module.exports = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  render: function(){
      var value = this.props.value;

      return this.transferPropsTo(<div>{this._dataText(value)}</div>)
  }
})
