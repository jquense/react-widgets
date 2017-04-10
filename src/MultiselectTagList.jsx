import React from 'react';
import PropTypes from 'prop-types';
import _  from './util/_';
import cx from 'classnames';
import CustomPropTypes from './util/propTypes';
import { instanceId } from './util/widgetHelpers';
import { dataText } from './util/dataHelpers';

import { isDisabled, isDisabledItem, isReadOnlyItem } from './util/interaction';

let optionId = (id, idx)=> `${id}__option__${idx}`;

export default React.createClass({

  mixins: [
    require('./mixins/PureRenderMixin'),
    require('./mixins/AriaDescendantMixin')()
  ],

  propTypes: {
    value:          PropTypes.array,
    focused:        PropTypes.number,

    valueField:     PropTypes.string,
    textField:      CustomPropTypes.accessor,

    onDelete:       PropTypes.func.isRequired,
    valueComponent: PropTypes.func,

    disabled:       CustomPropTypes.disabled.acceptsArray,
    readOnly:       CustomPropTypes.readOnly.acceptsArray
  },

  getDefaultProps(){
    return {
      ariaActiveDescendantKey: 'taglist'
    }
  },

  componentDidUpdate(){
    let { focused } = this.props
      , activeId = optionId(instanceId(this), focused)

    this.ariaActiveDescendant(
      (focused == null || isDisabledItem(focused, this.props)) ? null : activeId)
  },

  render() {
      let {
          focused, value, textField
        , valueComponent: ValueComponent }  = this.props;

      var id = instanceId(this);
      var props = _.omitOwnProps(this)

      return (
        <ul
          {...props}
          role='listbox'
          tabIndex='-1'
          className='rw-multiselect-taglist'
        >
          { value.map( (item, i) => {
            var isDisabled = isDisabledItem(item, this.props)
              , isReadonly = isReadOnlyItem(item, this.props)
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
                  : dataText(item, textField)
                }
                <span
                  tabIndex='-1'
                  onClick={!(isDisabled || isReadonly) ? this._delete.bind(null, item) : undefined}
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

    if (val && !(isDisabledItem(val, this.props)  || isReadOnlyItem(val, this.props)) )
      this.props.onDelete(val)
  },

  removeNext(){
    var val = this.props.value[this.props.value.length - 1];

    if (val && !(isDisabledItem(val, this.props) || isReadOnlyItem(val, this.props)))
      this.props.onDelete(val)
  },


  clear(){
    this.setState({ focused: null })
  },

  first(){
    var idx = 0
      , value = this.props.value
      , l = value.length;

    while( idx < l && isDisabledItem(value[idx], this.props) )
      idx++

    return idx !== l ? idx : null
  },

  last(){
    var value = this.props.value
      , idx = value.length - 1;

    while (idx > -1 && isDisabledItem(value[idx], this.props))
      idx--

    return idx >= 0 ? idx : null
  },

  next(current) {
    var nextIdx = current + 1
      , value = this.props.value
      , l = value.length;

    while (nextIdx < l && isDisabledItem(nextIdx, this.props))
      nextIdx++

    if (current === null || nextIdx >= l)
      return null;

    return nextIdx
  },

  prev(current){
    var nextIdx = current
      , value = this.props.value;

    if ( nextIdx === null || nextIdx === 0 )
      nextIdx = value.length

    nextIdx--;

    while (nextIdx > -1 && isDisabledItem(value[nextIdx], this.props))
      nextIdx--

    return nextIdx >= 0 ? nextIdx : null;
  }
});
