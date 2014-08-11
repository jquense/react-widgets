var React = require('react/addons')
  , cx = React.addons.classSet
  , Popup = require('../popup/popup.jsx')
  , Calendar = require('./calendar.jsx')
  , compose = require('../util/compose')
  , dates = require('../util/dates')
  , $ = require('zepto')


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
      textValue: this.formatDate(nextProps.value)
    })
  },

  componentDidUpdate: function() {
    this.props.focused && this.focus()
  },

  getInitialState: function(){
    var text = this.formatDate(this.props.value)
    return {
      textValue: text,
      lastValue: text
    }
  },

  getDefaultProps: function(){
    return {
      value: null
    }
  },

  render: function(){
    return this.transferPropsTo(
      <input 
        type='text' 
        className='rw-input' 
        value={this.state.textValue} 
        onChange={this._change} 
        onBlur={compose.chain(this.props.blur, this._blur)} />
    )
  },

  _change: function(e){
    var $el = $(e.target) ;

    this.setState({ textValue: $el.val() });
  },

  _blur: function(){
    var val = this.state.textValue

    this.props.onBlur(this.props.parse(val), val);

    if ( val === this.state.lastValue) return

    this.props.onChange(this.props.parse(val), val);
    this.setState({ lastValue: val });
  },

  focus: function(){
    this.getDOMNode().focus()
  },

  formatDate: function(date){
    var val = ''

    if ( (date instanceof Date) && isValid(date) )
      val = dates.format(date, this.props.format)

    return val;
  }
});

function isValid(d) {
  return !isNaN(d.getTime());
}