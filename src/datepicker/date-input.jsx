var React = require('react')
  , cx = require('react/lib/cx')
  , Popup = require('../popup/popup.jsx')
  , Calendar = require('./calendar.jsx')
  , globalize = require('globalize')
  , $ = require('zepto')


module.exports = React.createClass({

  mixins: [ require('react/lib/LinkedStateMixin') ],

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
      <input type='text' className='rw-input' value={this.state.textValue} onChange={this._change} onBlur={this._blur} />
    )
  },

  _change: function(e){
    var $el = $(e.target) ;

    this.setState({ textValue: $el.val() });
  },

  _blur: function(){
    var val = this.state.textValue

    if ( val === this.state.lastValue) return

    this.props.onChange(this.props.parse(val), val);
    this.setState({ lastValue: val });
  },

  formatDate: function(date){
    var val = ''

    if ( (date instanceof Date) && isValid(date) )
      val = globalize.format(date, this.props.format)

    return val;
  }
});

function isValid(d) {
  return !isNaN(d.getTime());
}