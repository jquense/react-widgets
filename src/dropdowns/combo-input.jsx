var React = require('react/addons')
  , cx = React.addons.classSet
  , compose = require('../util/compose')
  , caretPos = require('../util/caret')
  , $ = require('zepto')


module.exports = React.createClass({

  propTypes: {
    value:        React.PropTypes.string,
    suggestion:   React.PropTypes.string,
    onChange:     React.PropTypes.func.isRequired
  },


  componentDidUpdate: function() {
    var suggestion = (this.props.suggestion || '').toLowerCase()
      , val = this.props.value.toLowerCase()
      , el = this.getDOMNode();

    this.props.focused && this.focus()

    if (suggestion && val !== suggestion){
      var start = suggestion.indexOf(val) + val.length
        , end = suggestion.length - start

      if ( start >= 0)
        caretPos(el, start, start + end)
    }
  },

  // elephant
  // leph
  // 

  getDefaultProps: function(){
    return {
      value: ''
    }
  },

  render: function(){
    console.log(this.props.value, this.props.suggestion)
    return this.transferPropsTo(
      <input 
        type='text' 
        className='rw-input'
        value={this._value()}/>
    )
  },

  _change: function(e){
    var val = e.target.value
      , sel = caretPos(e.target)

    // if ( sel.start !== sel.end)
    //   return this.props.onChange(e, val.substr(0, sel.start))

    this.props.onChange(e, val)
  },

  _value: function(){
    var val = this.props.value.toLowerCase()
      , suggestion = (this.props.suggestion || '').toLowerCase();

    if (val === suggestion || !suggestion)
      return this.props.value

    return this.props.suggestion.substr(
      suggestion.indexOf(val))
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
  }
});
