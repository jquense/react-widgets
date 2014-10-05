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
        , hasDisabledItems = _.isArray(this.props.disabled)
        , hasReadonlyItems = _.isArray(this.props.readOnly);

      return mergeIntoProps(
        _.omit(this.props, 'value'),
        <ul className='rw-tag-list'>
          {_.map(value, function(item, i){
            var disabled = (this.props.disabled === true) 
                        || (hasDisabledItems && this._dataIndexOf(this.props.disabled, item) !== -1);

            var readonly = (this.props.readOnly && !hasReadonlyItems) 
                        || (hasReadonlyItems && this._dataIndexOf(this.props.readOnly, item) !== -1);

            return (
              <li key={i}
                  className={cx({
                    'rw-state-focus': !disabled && focusIdx === i, 
                    'rw-state-disabled': disabled })
                  }>
                { this.props.valueComponent
                    ? this.props.valueComponent({ item: item })
                    : this._dataText(item)
                }
                <btn tabIndex='-1' onClick={!readonly && this._delete.bind(null, item)} 
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
    var val = this.props.value[this.state.focused]
      , readonly = this.props.readOnly === true || this._dataIndexOf(this.props.readOnly, val) !== -1
      , disabled = this.props.disabled === true || this._dataIndexOf(this.props.disabled, val) !== -1;

    if ( val && !(disabled || readonly)) 
      this.props.onDelete(val)
  },

  removeNext: function(){
    var val = _.last(this.props.value)
      , readonly = this.props.readOnly === true || this._dataIndexOf(this.props.readOnly, val) !== -1
      , disabled = this.props.disabled === true || this._dataIndexOf(this.props.disabled, val) !== -1;

    if ( val && !(disabled || readonly)) 
      this.props.onDelete(val)
  },

  clear: function(){
    this.setState({ focused: null })
  },

  first: function(){
    this.setState({ focused: 0 })
  },

  last: function(){
    this.setState({ focused: this.props.value.length - 1 })
  },

  next: function(){
    var nextIdx = this.state.focused + 1;

    if ( this.state.focused === null ) 
      return

    if ( nextIdx >= this.props.value.length )
      return this.clear();

    this.setState({ focused: nextIdx })
  },

  prev: function(){
    var nextIdx = this.state.focused;

    if ( nextIdx === null )
      nextIdx = this.props.value.length
    else if ( nextIdx <= 0 ) 
      nextIdx = 1

    this.setState({ focused: nextIdx - 1 })
  }
})


var DefaultTag = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  render: function(){
      var item = this.props.item;

      return this.transferPropsTo(<span>{ item ? this._dataText(item) : '' }</span>)
  }
})