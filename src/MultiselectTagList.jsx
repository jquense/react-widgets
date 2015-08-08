'use strict';
var React = require('react')
  , _     = require('./util/_')
  , cx    = require('classnames')
  , CustomPropTypes = require('./util/propTypes')

import WidgetMixin from './mixins/WidgetMixin';

let optionId = (id, idx)=> `${id}__option__${idx}`;


module.exports = React.createClass({

  displayName: 'MultiselectTagList',

  mixins: [
    require('./mixins/DataHelpersMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/AriaDescendantMixin')()
  ],

  propTypes: {
    value:          React.PropTypes.array,
    focused:        React.PropTypes.number,

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

  getDefaultProps(){
    return {
      ariaActiveDescendantKey: 'taglist',
    }
  },

  componentDidUpdate(){
    let { value, focused } = this.props
      , activeId = optionId(WidgetMixin._id.call(this), focused)

    this.ariaActiveDescendant(
      (focused == null || this.isDisabled(focused)) ? null : activeId)
  },

  render() {
      var ValueComponent = this.props.valueComponent
        , props     = _.omit(this.props, ['value', 'disabled', 'readOnly'])
        , { focused, optionID, value }  = this.props;

      var id = WidgetMixin._id.call(this);

      return (
        <ul {...props}
          role='listbox'
          tabIndex='-1'
          className='rw-multiselect-taglist'
        >
          { value.map( (item, i) => {
            var isDisabled = this.isDisabled(item)
              , isReadonly = this.isReadOnly(item)
              , isFocused  = !isDisabled && focused === i
              , currentID  = optionId(id, i);

            return (
              <li
                key={i}
                id={currentID}
                tabIndex='-1'
                role='option'
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
                <span
                  tabIndex='-1'
                  onClick={!(isDisabled || isReadonly) && this._delete.bind(null, item)}
                  aria-disabled={isDisabled}
                  aria-label='Unselect'
                  disabled={isDisabled}
                >
                  <span className='rw-tag-btn' aria-hidden="true">&times;</span>
                </span>
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

    return idx !== l ? idx : null
  },

  last(){
    var idx = this.props.value.length - 1;

    while (idx > -1 && this.isDisabled(idx, true))
      idx--

    return idx >= 0 ? idx : null
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

    if ( nextIdx === null || nextIdx === 0 )
      nextIdx = this.props.value.length

    nextIdx--;

    while (nextIdx > -1 && this.isDisabled(nextIdx, true))
      nextIdx--

    return nextIdx >= 0 ? nextIdx : null;
  }
})
