import React from 'react';
import CustomPropTypes from './util/propTypes';
import _  from './util/_';
import { dataText, dataValue } from './util/dataHelpers';

let ListOptionItem = React.createClass({
  propTypes: {
    dataItem: React.PropTypes.any,
    focused:  React.PropTypes.bool,
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,

    onSelect: React.PropTypes.func,

    textField:     CustomPropTypes.accessor,

    optionComponent: CustomPropTypes.elementType.isRequired,
    itemComponent:   CustomPropTypes.elementType
  },

  shouldComponentUpdate(nextProps) {
    return this.props.dataItem !== nextProps.dataItem
        || this.props.focused !== nextProps.focused
        || this.props.selected !== nextProps.selected
        || this.props.disabled !== nextProps.disabled
        || this.props.readOnly !== nextProps.readOnly
        || this.props.textField !== nextProps.textField
        || this.props.optionComponent !== nextProps.optionComponent
        || this.props.itemComponent !== nextProps.itemComponent;
  },

  handleClick() {
    let { disabled, readOnly, dataItem, onSelect } = this.props;
    if (onSelect && !disabled && !readOnly) {
      onSelect(dataItem);
    }
  },

  render() {
    let {
        id
      , dataItem
      , disabled
      , focused
      , selected
      , readOnly
      , textField
      , valueField
      , itemComponent: ItemComponent
      , optionComponent: Option } = this.props;

    return (
      <Option
        id={id}
        dataItem={dataItem}
        disabled={disabled}
        readOnly={readOnly}
        focused={focused}
        selected={selected}
        onClick={this.handleClick}
      >
        { ItemComponent
          ? <ItemComponent
              item={dataItem}
              value={dataValue(dataItem, valueField)}
              text={dataText(dataItem, textField)}
              disabled={disabled}
              readOnly={readOnly}
            />
          : dataText(dataItem, textField)
        }
      </Option>
    )
  }
});

export default ListOptionItem;

