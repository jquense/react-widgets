import React from 'react';

import MultiselectTag from './MultiselectTag';
import * as CustomPropTypes from './util/PropTypes';
import { isDisabledItem } from './util/interaction';

class MultiselectTagList extends React.Component {

  static propTypes ={
    id: React.PropTypes.string.isRequired,
    activeId: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,

    value: React.PropTypes.array,
    focusedItem: React.PropTypes.any,

    valueAccessor: React.PropTypes.func.isRequired,
    textAccessor: React.PropTypes.func.isRequired,

    onDelete: React.PropTypes.func.isRequired,
    valueComponent: React.PropTypes.func,

    disabled: CustomPropTypes.disabled.acceptsArray,
    readOnly: CustomPropTypes.disabled
  };

  handleDelete = (item, event) => {
    if (!this.props.disabled)
      this.props.onDelete(item, event)
  };

  render() {
    let {
        id
      , value
      , activeId
      , valueAccessor
      , textAccessor
      , label
      , disabled
      , focusedItem
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
          let isFocused = focusedItem === item;

          return (
            <MultiselectTag
              key={i}
              id={isFocused ? activeId : null }
              value={item}
              focused={isFocused}
              onClick={this.handleDelete}
              disabled={isDisabledItem(item, disabled, valueAccessor)}
            >
              {ValueComponent
                ? <ValueComponent item={item} />
                : <span>{textAccessor(item)}</span>
              }
            </MultiselectTag>
          )
        })}
      </ul>
    )
  }
}

export default MultiselectTagList
