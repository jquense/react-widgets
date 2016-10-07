import React from 'react';
import ListOption from './ListOption';

import { instanceId } from './util/widgetHelpers';
import { contains } from './util/interaction';

export default function getSelectListItem(parent) {

  class SelectListItem extends React.Component {
    static propTypes = {
      disabled: React.PropTypes.bool,
      readOnly: React.PropTypes.bool,
      dataItem: React.PropTypes.any,
    };

    handleChange = (e) => {
      let { disabled, readOnly, dataItem } = this.props;

      if (!disabled && !readOnly)
        parent.handleChange(dataItem, e.target.checked)
    };

    handleMouseDown = () => {
      parent._clicking = true
    };

    render() {
      let {
          children
        , disabled
        , readOnly
        , dataItem: item } = this.props;

      let {
        multiple,
        name = instanceId(parent, '_name')
      } = parent.props;

      let checked = contains(item, parent._values(), parent.props.valueField)
        , type = multiple ? 'checkbox' : 'radio';

      return (
        <ListOption
          {...this.props}
          role={type}
          aria-checked={!!checked}
        >
          <label
            onMouseDown={this.handleMouseDown}
            className="rw-select-list-label"
          >
            <input
              name={name}
              type={type}
              tabIndex='-1'
              role='presentation'
              checked={checked}
              className="rw-select-list-input"
              disabled={disabled || readOnly}
              onChange={this.handleChange}
            />
              {children}
          </label>
        </ListOption>
      );
    }
  }

  return SelectListItem;
}
