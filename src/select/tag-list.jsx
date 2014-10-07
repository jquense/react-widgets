var React = require('react')
  , _ = require('lodash')
  , cx  = require('../util/cx')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , btn = require('../common/btn.jsx')

module.exports = React.createClass({
  displayName: 'SelectTagList',

  mixins: [
    require('../mixins/DataHelpersMixin'),
    require('../mixins/PureRenderMixin')
  ],

  propTypes: {
    value:          React.PropTypes.array,

    valueField:     React.PropTypes.string,
    textField:      React.PropTypes.string,

    valueComponent: React.PropTypes.component,

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
      var focusIdx = this.state.focused
        , value    = this.props.value
        , itemDisabled = _.isArray(this.props.disabled)
        , itemReadonly = _.isArray(this.props.readOnly);

      return mergeIntoProps(
        _.omit(this.props, 'value', 'disabled', 'readOnly'),
        <ul className='rw-tag-list'>
          {_.map(value, function(item, i){
            var disabled = this.isDisabled(item)
              , readonly = this.isReadOnly(item);

            return (
              <li key={i}
                  className={cx({
                    'rw-state-focus': !disabled && focusIdx === i,
                    'rw-state-disabled': disabled,
                    'rw-state-readonly': readonly})
                  }>
                { this.props.valueComponent
                    ? this.props.valueComponent({ item: item })
                    : this._dataText(item)
                }
                <btn tabIndex='-1' onClick={!(disabled || readonly) && this._delete.bind(null, item)}
                  aria-disabled={disabled}
                  disabled={disabled}>
                  &times;<span className="rw-sr">{ "Remove " + this._dataText(item) }</span>
                </btn>
              </li>)
          }, this)}
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
    var val = _.last(this.props.value);

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
