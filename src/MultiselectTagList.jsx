'use strict';
var React = require('react')
  , _     = require('./util/_')
  , cx    = require('classnames')
  , Btn   = require('./WidgetButton')
  , CustomPropTypes = require('./util/propTypes')

import WidgetMixin from './mixins/WidgetMixin';

module.exports = React.createClass({

  displayName: 'MultiselectTagList',

  mixins: [
    require('./mixins/DataHelpersMixin'),
    require('./mixins/PureRenderMixin')
  ],

  propTypes: {
    value:          React.PropTypes.array,
    focused:        React.PropTypes.number,

    focusID:        React.PropTypes.string,
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

  render() {
      var ValueComponent = this.props.valueComponent
        , props     = _.omit(this.props, ['value', 'disabled', 'readOnly'])
        , { focused, focusID, value }  = this.props;

      return (
        <ul {...props}
          className='rw-multiselect-taglist'
        >
          { value.map( (item, i) => {
            var isDisabled = this.isDisabled(item)
              , isReadonly = this.isReadOnly(item)
              , isFocused  = !isDisabled && focused === i
              , id = WidgetMixin._id.call(this, '_tag_option_' + i);

            id = isFocused ? focusID || id : id

            return (
              <li
                key={i}
                id={id}
                tabIndex='-1'
                className={cx({
                  'rw-state-focus':    isFocused,
                  'rw-state-disabled': isDisabled,
                  'rw-state-readonly': isReadonly
                })}
              >
                { ValueComponent
                  ? <ValueComponent item={item }/>
                  : this._dataText(item)
                }
                <Btn
                  tabIndex='-1'
                  onClick={!(isDisabled || isReadonly) && this._delete.bind(null, item)}
                  aria-disabled={isDisabled}
                  aria-label='Remove selected item'
                  disabled={isDisabled}
                >
                  <span aria-hidden="true">&times;</span>
                </Btn>
              </li>)
          })}
        </ul>
      )
  },

  _delete(val){
    this.props.onDelete(val)
  },

  remove(idx){
    var val = this.props.value[idx];

    if (val && !(this.isDisabled(val)  || this.isReadOnly(val)) )
      this.props.onDelete(val)
  },

  removeNext(){
    var val = this.props.value[this.props.value.length - 1];

    if (val && !(this.isDisabled(val) || this.isReadOnly(val)))
      this.props.onDelete(val)
  },

  isDisabled(val, isIdx) {
    if (isIdx) val = this.props.value[val]

    return this.props.disabled === true || this._dataIndexOf(this.props.disabled || [], val) !== -1
  },

  isReadOnly(val, isIdx) {
    if (isIdx) val = this.props.value[val]

    return this.props.readOnly === true || this._dataIndexOf(this.props.readOnly || [], val) !== -1
  },

  clear(){
    this.setState({ focused: null })
  },

  first(){
    var idx = 0
      , l = this.props.value.length;

    while( idx < l && this.isDisabled(idx, true) )
      idx++

    if (idx !== l)
      return idx
  },

  last(){
    var idx = this.props.value.length - 1;

    while (idx > -1 && this.isDisabled(idx, true))
      idx--

    if (idx >= 0)
      return idx
  },

  next(current) {
    var nextIdx = current + 1
      , l = this.props.value.length;

    while (nextIdx < l && this.isDisabled(nextIdx, true))
      nextIdx++

    if (current === null || nextIdx >= l)
      return null;

    return nextIdx
  },

  prev(current){
    var nextIdx = current;

    if ( nextIdx === null )
      nextIdx = this.props.value.length

    nextIdx--;

    while (nextIdx > -1 && this.isDisabled(nextIdx, true))
      nextIdx--

    if (nextIdx >= 0)
      return nextIdx
  }
})
