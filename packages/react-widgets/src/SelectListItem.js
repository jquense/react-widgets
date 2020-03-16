import React from 'react';
import PropTypes from 'prop-types';
import ListOption from './ListOption';
import cs from 'classnames';


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

    labelClass: PropTypes.string,
    inputClass: PropTypes.string,
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
      , labelClass
      , inputClass
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
          className={cs('rw-select-list-label', labelClass)}
        >
          <input
            name={name}
            type={type}
            tabIndex='-1'
            checked={checked}
            disabled={disabled || !!readOnly}
            role='presentation'
            className={cs('rw-select-list-input', inputClass)}
            onChange={this.handleChange}
          />
          {children}
        </label>
      </ListOption>
    );
  }
}

export default SelectListItem;
