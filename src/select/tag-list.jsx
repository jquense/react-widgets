var React = require('react/addons')

module.exports = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  render: function(){
      var value = this.props.value;

      return this.transferPropsTo(
        <input type='text' className='rw-input'/>
        )
  }
})
