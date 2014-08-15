var React = require('react/addons')
  , cx = React.addons.classSet
  , compose = require('../util/compose')
  , setter = require('../util/stateSetter')
  , globalize = require('globalize')
  , $ = require('$')


module.exports = React.createClass({

  displayName: 'NumberPickerInput', 

  propTypes: {
    value:        React.PropTypes.number,
    format:       React.PropTypes.string,

    onChange:     React.PropTypes.func.isRequired,
    onKeyDown:    React.PropTypes.func,
  },

  getDefaultProps: function(){
    return {
      value: null,
      format: 'd',
      editing: false,
    }
  },

  getInitialState: function(){
    return { stringValue: ''}
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.current('')
  },

  // componentDidUpdate: function(prevProps, prevState){
  //   this.state.focused && this.getDOMNode().focus()
  // },

  render: function(){
    var value = this.state.stringValue || this.props.value

    value = this.props.editing 
          ? value
          : globalize.format(value, this.props.format)

   
    return this.transferPropsTo(
      <input 
        type='text' 
        className='rw-input'
        onKeyDown={this.props.onKeyDown}
        onChange={this._change}
        value={value}/>
    )
  },

  _change: function(e){
    var number = +e.target.value

    if ( isNaN(number)) return 

    if(number !== this.props.value)
      this.props.onChange(number)

    else 
      this.current(e.target.value)
  },

  //this intermediate state is for when one runs into the decimal
  current: setter('stringValue'),

});
