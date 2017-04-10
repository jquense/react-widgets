import React from 'react';

import PropTypes from 'prop-types';

import * as CustomPropTypes from './util/PropTypes';
import { dataText } from './util/dataHelpers';

class DropdownListInput extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    placeholder: PropTypes.string,
    textField: CustomPropTypes.accessor,
    valueComponent: CustomPropTypes.elementType
  };

  render() {
    let {
        placeholder
      , value
      , textField
      , valueComponent: Component } = this.props;

    return (
      <div className="rw-input rw-dropdown-list-input">
        {!value && placeholder
          ? <span className='rw-placeholder'>{placeholder}</span>
          : Component
            ? <Component item={value} />
            : dataText(value, textField)
        }
      </div>
    )
  }
}
export default DropdownListInput;
