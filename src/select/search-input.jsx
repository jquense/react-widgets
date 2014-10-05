var React = require('react')

module.exports = React.createClass({
  
  displayName: 'SelectSearchInput',

  propTypes: {
    value:        React.PropTypes.string,
    onChange:     React.PropTypes.func.isRequired,

    disabled:     React.PropTypes.bool,
    readOnly:     React.PropTypes.bool,
  },


  componentDidUpdate: function() {
    this.props.focused && this.focus()
  },

  render: function(){
      var value = this.props.value
        , placeholder = this.props.placeholder
        , size = Math.max((value || placeholder).length, 1);

      return this.transferPropsTo(
        <input type='text' 
          className='rw-input'
          aria-disabled={this.props.disabled}
          aria-readonly={this.props.readOnly}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          size={size}/>
      )
  },

  focus: function(){
    this.getDOMNode().focus()
  }

})
