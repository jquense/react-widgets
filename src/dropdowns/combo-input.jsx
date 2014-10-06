var React = require('react')
  , cx = require('../util/cx')
  , compose = require('../util/compose')
  , caretPos = require('../util/caret');

module.exports = React.createClass({

  propTypes: {
    value:        React.PropTypes.string,
    onChange:     React.PropTypes.func.isRequired
  },


  // hello
  componentDidUpdate: function() {
    var input = this.getDOMNode()
      , val = this.props.value;

    if ( this.isSuggesting() ){
      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length
        , end   = val.length - start

      if ( start >= 0) {
        caretPos(input, start, start + end)
      }
    }
  },

  getDefaultProps: function(){
    return {
      value: ''
    }
  },

  render: function(){
    return this.transferPropsTo(
      <input 
        type='text' 
        className='rw-input'
        onKeyDown={this.props.onKeyDown}
        onChange={this._change}
        value={this.props.value == null ? '' : this.props.value}/>
    )
  },

  isSuggesting: function(){
    var val = this.props.value
      , isSuggestion = this._last != null
          && val.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;

    return this.props.suggest && isSuggestion
  },

  accept: function(removeCaret){
    var val = this.getDOMNode().value || ''
      , end = val.length;

    this._last = null
    removeCaret && caretPos(this.getDOMNode(), end, end)
  },

  _change: function(e){
    var val = e.target.value
    this._last = val;
    this.props.onChange(e, val)
  },

  focus: function(){
    this.getDOMNode().focus()
  }
});
