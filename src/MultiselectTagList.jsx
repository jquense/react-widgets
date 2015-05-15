'use strict';
var React = require('react')
  , _     = require('./util/_')
  , cx    = require('classnames')
  , Btn   = require('./WidgetButton')
  , CustomPropTypes = require('./util/propTypes');

module.exports = React.createClass({
  
  displayName: 'MultiselectTagList',

  mixins: [
    require('./mixins/DataHelpersMixin'),
    require('./mixins/PureRenderMixin')
  ],

  propTypes: {
    value:          React.PropTypes.array,

    valueField:     React.PropTypes.string,
    textField:      CustomPropTypes.accessor,

    valueComponent: React.PropTypes.func,

    disabled:       React.PropTypes.oneOfType([
                      React.PropTypes.bool,
                      React.PropTypes.array,
                      React.PropTypes.oneOf(['disabled'])
                    ]),

    readOnly:       React.PropTypes.oneOfType([
                      React.PropTypes.bool,
                      React.PropTypes.array,
                      React.PropTypes.oneOf(['readonly'])
                    ])
  },


  getInitialState: function(){
    return {
      focused: null
    }
  },

  render: function(){
      var ValueComponent = this.props.valueComponent
        , props     = _.omit(this.props, ['value', 'disabled', 'readOnly'])
        , focusIdx  = this.state.focused
        , value     = this.props.value;

      return (
        <ul {...props} 
          className='rw-multiselect-taglist'>
          { value.map( (item, i) => {
            var disabled = this.isDisabled(item)
              , readonly = this.isReadOnly(item);

            return (
              <li key={i}
                  className={cx({
                    'rw-state-focus': !disabled && focusIdx === i,
                    'rw-state-disabled': disabled,
                    'rw-state-readonly': readonly})
                  }>
                { ValueComponent
                    ? <ValueComponent item={item }/>
                    : this._dataText(item)
                }
                <Btn tabIndex='-1' onClick={!(disabled || readonly) && this._delete.bind(null, item)}
                  aria-disabled={disabled}
                  disabled={disabled}>
                  { "\u00d7" }<span className="rw-sr">{ "Remove " + this._dataText(item) }</span>
                </Btn>
              </li>)
          })}
        </ul>
      )
  },

  _delete: function(val, e){
    this.props.onDelete(val)
  },

  removeCurrent: function(){
    var val = this.props.value[this.state.focused];

    if ( val && !(this.isDisabled(val)  || this.isReadOnly(val) ))
      this.props.onDelete(val)
  },

  isDisabled: function(val, isIdx) {
    if(isIdx) val = this.props.value[val]

    return this.props.disabled === true || this._dataIndexOf(this.props.disabled || [], val) !== -1
  },

  isReadOnly: function(val, isIdx) {
    if(isIdx) val = this.props.value[val]

    return this.props.readOnly === true || this._dataIndexOf(this.props.readOnly || [], val) !== -1
  },

  removeNext: function(){
    var val = this.props.value[this.props.value.length - 1];

    if ( val && !(this.isDisabled(val)  || this.isReadOnly(val) ))
      this.props.onDelete(val)
  },

  clear: function(){
    this.setState({ focused: null })
  },

  first: function(){
    var idx = 0
      , l = this.props.value.length;

    while( idx < l && this.isDisabled(idx, true) )
      idx++

    if (idx !== l)
      this.setState({ focused: idx })
  },

  last: function(){
    var idx = this.props.value.length - 1;

    while( idx > -1 && this.isDisabled(idx, true) )
      idx--

    if (idx >= 0)
      this.setState({ focused: idx })
  },

  next: function(){
    var nextIdx = this.state.focused + 1
      , l = this.props.value.length;

    while( nextIdx < l && this.isDisabled(nextIdx, true) )
      nextIdx++

    if ( this.state.focused === null )
      return

    if ( nextIdx >= l )
      return this.clear();

    this.setState({ focused: nextIdx })
  },

  prev: function(){
    var nextIdx = this.state.focused;

    if ( nextIdx === null )
      nextIdx = this.props.value.length

    nextIdx--;

    while( nextIdx > -1 && this.isDisabled(nextIdx, true) )
      nextIdx--

    if ( nextIdx >= 0 )
      this.setState({ focused: nextIdx  })
  }
})
