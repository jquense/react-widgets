import React from 'react';
import _  from './util/_';
import cn from 'classnames';
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
    value:          React.PropTypes.array,
    focused:        React.PropTypes.number,

    valueField:     React.PropTypes.string,
    textField:      CustomPropTypes.accessor,

    onDelete:       React.PropTypes.func.isRequired,
    valueComponent: React.PropTypes.func,

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
        focused
      , value
      , textField
      , valueComponent: ValueComponent }  = this.props;

    let id = instanceId(this);
    let props = _.omitOwnProps(this)

    return (
      <ul
        {...props}
        tabIndex='-1'
        role='listbox'
        className='rw-multiselect-taglist'
      >
        { value.map( (item, i) => {
          let isDisabled = isDisabledItem(item, this.props)
            , isReadonly = isReadOnlyItem(item, this.props)
            , isFocused  = !isDisabled && focused === i
            , currentID  = optionId(id, i);

          let clickHandler;
          if (!isDisabled && !isReadonly)
            clickHandler = this.handleDelete.bind(null, item);

          return (
            <li
              key={i}
              id={currentID}
              tabIndex='-1'
              role='option'
              className={cn(
                'rw-multiselect-tag',
                isFocused && 'rw-state-focus',
                isDisabled && 'rw-state-disabled',
                isReadonly && 'rw-state-readonly'
              )}
            >
              {ValueComponent
                ? <ValueComponent item={item }/>
                : dataText(item, textField)
              }
              <span
                tabIndex='-1'
                className='rw-tag-btn'
                onClick={clickHandler}
                aria-disabled={isDisabled}
                aria-label='Unselect'
                disabled={isDisabled}
              >
                <span aria-hidden="true">&times;</span>
              </span>
            </li>)
        })}
      </ul>
    )
  },

  handleDelete(val) {
    this.props.onDelete(val)
  },

  remove(idx) {
    let val = this.props.value[idx];

    if (val && !(isDisabledItem(val, this.props) || isReadOnlyItem(val, this.props)) )
      this.props.onDelete(val)
  },

  removeNext() {
    let val = this.props.value[this.props.value.length - 1];

    if (val && !(isDisabledItem(val, this.props) || isReadOnlyItem(val, this.props)))
      this.props.onDelete(val)
  },


  clear() {
    this.setState({ focused: null })
  },

  first() {
    let idx = 0
      , value = this.props.value
      , l = value.length;

    while( idx < l && isDisabledItem(value[idx], this.props) )
      idx++

    return idx !== l ? idx : null
  },

  last() {
    let value = this.props.value
      , idx = value.length - 1;

    while (idx > -1 && isDisabledItem(value[idx], this.props))
      idx--

    return idx >= 0 ? idx : null
  },

  next(current) {
    let nextIdx = current + 1
      , value = this.props.value
      , l = value.length;

    while (nextIdx < l && isDisabledItem(nextIdx, this.props))
      nextIdx++

    if (current === null || nextIdx >= l)
      return null;

    return nextIdx
  },

  prev(current) {
    let nextIdx = current
      , value = this.props.value;

    if ( nextIdx === null || nextIdx === 0 )
      nextIdx = value.length

    nextIdx--;

    while (nextIdx > -1 && isDisabledItem(value[nextIdx], this.props))
      nextIdx--

    return nextIdx >= 0 ? nextIdx : null;
  }
});
