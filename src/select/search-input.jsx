var React = require('react/addons')

module.exports = React.createClass({

  propTypes: {
    value:        React.PropTypes.string,
    onChange:     React.PropTypes.func.isRequired,
  },


  componentDidUpdate: function() {
    this.props.focused && this.focus()
  },

  render: function(){
      var value = this.props.valueLink.value;

      return this.transferPropsTo(
        <input type='text' 
          className='rw-input'  
          size={Math.max( (value || '').length, 1)}/>
      )
  },

  focus: function(){
    this.getDOMNode().focus()
  }

})
