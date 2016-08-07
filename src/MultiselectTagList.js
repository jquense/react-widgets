import React from 'react';

import MultiselectTag from './MultiselectTag';
import _  from './util/_';
import CustomPropTypes from './util/propTypes';
import { dataText } from './util/dataHelpers';

import { isDisabledItem, isReadOnlyItem } from './util/interaction';

class MultiselectTagList extends React.Component {

  static propTypes ={
    id: React.PropTypes.string.isRequired,
    activeId: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,

    value: React.PropTypes.array,
    focused: React.PropTypes.number,

    valueField: React.PropTypes.string,
    textField: CustomPropTypes.accessor,

    onDelete: React.PropTypes.func.isRequired,
    valueComponent: React.PropTypes.func,

    disabled: CustomPropTypes.disabled.acceptsArray,
    readOnly: CustomPropTypes.readOnly.acceptsArray
  };

  handleDelete = (val) => {
    this.props.onDelete(val)
  };

  render() {
    let {
        focused
      , value
      , id
      , activeId
      , textField
      , label
      , valueComponent: ValueComponent }  = this.props;

    return (
      <ul
        id={id}
        tabIndex='-1'
        role='listbox'
        aria-label={label}
        className='rw-multiselect-taglist'
      >
        {value.map((item, i) => {
          let isFocused = focused === i;

          return (
            <MultiselectTag
              key={i}
              id={isFocused ? activeId : null }
              value={item}
              focused={isFocused}
              onClick={this.handleDelete}
              disabled={isDisabledItem(item, this.props)}
              readOnly={isReadOnlyItem(item, this.props)}
            >
              {ValueComponent
                ? <ValueComponent item={item} />
                : <span>{dataText(item, textField)}</span>
              }
            </MultiselectTag>
          )
        })}
      </ul>
    )
  }

  remove(idx) {
    let val = this.props.value[idx];

    if (val && !(isDisabledItem(val, this.props) || isReadOnlyItem(val, this.props)) )
      this.props.onDelete(val)
  }

  removeNext() {
    let val = this.props.value[this.props.value.length - 1];

    if (val && !(isDisabledItem(val, this.props) || isReadOnlyItem(val, this.props)))
      this.props.onDelete(val)
  }


  clear() {
    this.setState({ focused: null })
  }

  first() {
    let idx = 0
      , value = this.props.value
      , l = value.length;

    while( idx < l && isDisabledItem(value[idx], this.props) )
      idx++

    return idx !== l ? idx : null
  }

  last() {
    let value = this.props.value
      , idx = value.length - 1;

    while (idx > -1 && isDisabledItem(value[idx], this.props))
      idx--

    return idx >= 0 ? idx : null
  }

  next(current) {
    let nextIdx = current + 1
      , value = this.props.value
      , l = value.length;

    while (nextIdx < l && isDisabledItem(nextIdx, this.props))
      nextIdx++

    if (current === null || nextIdx >= l)
      return null;

    return nextIdx
  }

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
}

export default MultiselectTagList
