/**  React.DOM */
var React = require('react')
  , cx = require('../util/cx')
  , compose = require('../util/compose')
  , dates = require('../util/dates');


module.exports = React.createClass({

  displayName: 'DatePickerInput',


  propTypes: {
    format:       React.PropTypes.string,
    parse:        React.PropTypes.func.isRequired,

    value:        React.PropTypes.instanceOf(Date),
    onChange:     React.PropTypes.func.isRequired,
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      textValue: formatDate(nextProps.value, nextProps.format)
    })
  },

  getInitialState: function(){
    var text = formatDate(this.props.value, this.props.format)

    return {
      textValue: text
    }
  },

  getDefaultProps: function(){
    return {
      value: null
    }
  },

  render: function(){
    return this.transferPropsTo(
      React.DOM.input({
        type: "text", 
        className: cx({'rw-input': true }), 
        value: this.state.textValue, 
        'aria-disabled': this.props.disabled, 
        'aria-readonly': this.props.readOnly, 
        disabled: this.props.disabled, 
        readOnly: this.props.readOnly, 
        onChange: this._change, 
        onBlur: compose.chain(this.props.blur, this._blur)})
    )
  },

  _change: function(e){
    this.setState({ textValue: e.target.value });
  },

  _blur: function(){
    var val = this.state.textValue

    if ( val === this.state.lastValue) return

    this.props.onChange(this.props.parse(val), val);
    this.setState({ lastValue: val });
  },

  focus: function(){
    this.getDOMNode().focus()
  },

  
});

function isValid(d) {
  return !isNaN(d.getTime());
}

function formatDate(date, format){
  var val = ''

  if ( (date instanceof Date) && isValid(date) )
    val = dates.format(date, format)

  return val;
}