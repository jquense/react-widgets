import React from 'react';
import PropTypes from 'prop-types';
import ListOption from './ListOption';


class SelectListItem extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    dataItem: PropTypes.any,
    checked: PropTypes.bool.isRequired,

    onChange: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    let { onChange, disabled, dataItem } = this.props;

    if (!disabled)
      onChange(dataItem, e.target.checked)
  };

  render() {
    let {
        children
      , disabled
      , readOnly
      , name
      , type
      , checked
      , onMouseDown
      , ...props } = this.props;

    delete props.onChange;

    return (
      <ListOption
        {...props}
        role={type}
        disabled={disabled}
        aria-checked={!!checked}
      >
        <label
          onMouseDown={onMouseDown}
          className="rw-select-list-label"
        >
          <input
            name={name}
            type={type}
            tabIndex='-1'
            checked={checked}
            disabled={disabled || !!readOnly}
            role='presentation'
            className="rw-select-list-input"
            onChange={this.handleChange}
          />
            {children}
        </label>
      </ListOption>
    );
  }
}

export default SelectListItem;
