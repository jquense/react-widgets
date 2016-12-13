import React from 'react';
import ListOption from './ListOption';


class SelectListItem extends React.Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    dataItem: React.PropTypes.any,
    checked: React.PropTypes.bool.isRequired,

    onChange: React.PropTypes.func.isRequired,
    onMouseDown: React.PropTypes.func.isRequired,
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
