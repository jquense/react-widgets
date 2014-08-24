var React = require('react')
  , cx = require('../util/cx')
  , compose = require('../util/compose')
  , caretPos = require('../util/caret');

module.exports = React.createClass({

  propTypes: {
    value:        React.PropTypes.string,
    suggestion:   React.PropTypes.string,
    onChange:     React.PropTypes.func.isRequired
  },


  // hello
  componentDidUpdate: function() {
    var input = this.getDOMNode()
      , val = this.props.value
      , isSuggestion =  this._last !== ''
          && val.indexOf(this._last) !== -1 
          && this._last !== val;

    if ( this.props.suggest && isSuggestion ){
      var start = val.indexOf(this._last) + this._last.length
        , end   = val.length - start

      if ( start >= 0)
        caretPos(input, start, start + end)
    }

    this._last = val;
  },


  getDefaultProps: function(){
    return {
      value: '',
      suggestion: ''
    }
  },

  render: function(){
    //console.log(this.props.value, this.props.suggestion)
    return this.transferPropsTo(
      <input 
        type='text' 
        className='rw-input'
        onKeyDown={this.props.onKeyDown}
        onChange={this._change}
        value={this.props.value}/>
    )
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
