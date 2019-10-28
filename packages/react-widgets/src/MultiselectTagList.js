import PropTypes from 'prop-types'
import React from 'react'
import MultiselectTag from './MultiselectTag'
import * as CustomPropTypes from './util/PropTypes'
import { dataIndexOf } from './util/dataHelpers'

// disabled === true || [1, 2, 3, etc]
const isDisabled = (item, list, value) =>
  !!(Array.isArray(list) ? ~dataIndexOf(list, item, value) : list)

class MultiselectTagList extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    activeId: PropTypes.string.isRequired,
    label: PropTypes.string,

    value: PropTypes.array,
    focusedItem: PropTypes.any,

    clearTagIcon: PropTypes.node,

    valueAccessor: PropTypes.func.isRequired,
    textAccessor: PropTypes.func.isRequired,

    onDelete: PropTypes.func.isRequired,
    renderTagValue: PropTypes.func,
    tagOptionComponent: CustomPropTypes.elementType,

    disabled: CustomPropTypes.disabled.acceptsArray,
  }

  render() {
    let {
      id,
      value,
      activeId,
      valueAccessor,
      textAccessor,
      label,
      disabled,
      onDelete,
      focusedItem,
      children,
      clearTagIcon,
      renderTagValue,
      tagOptionComponent: TagOption = MultiselectTag,
    } = this.props

    return (
      <div
        id={id}
        role="listbox"
        aria-label={label}
        className="rw-multiselect-taglist"
      >
        {value.map((item, i) => {
          let isFocused = focusedItem === item

          return (
            <TagOption
              key={i}
              id={isFocused ? activeId : null}
              value={item}
              focused={isFocused}
              onRemove={onDelete}
              clearTagIcon={clearTagIcon}
              disabled={isDisabled(item, disabled, valueAccessor)}
            >
              {renderTagValue ? renderTagValue({ item }) : textAccessor(item)}
            </TagOption>
          )
        })}
        {children}
      </div>
    )
  }
}

export default MultiselectTagList
