
import invert from 'lodash/invert'
import PropTypes from 'prop-types';
import React from 'react';

import Default from './Default';
import Controllable from './Controllable';
import Type from './Type';

const controllableProps = {
  value: 'onChange',
  searchTerm: 'onSeach',
  open: 'onToggle',
  currentDate: 'onCurrentDateChange',
}

const otherControlled = invert(controllableProps);

class PropHeader extends React.Component {
  static contextTypes = {
    prefix: PropTypes.string.isRequired
  };

  render() {
    let {
        name
      , type
      , doclets = {}
      , defaultValue
    } = this.props.prop;

    let otherName = doclets.controllable || otherControlled[name] || controllableProps[name];

    return (
       <h3 className='prop-header' id={name}>
        <a href={`#${name}`}>{name}</a>

        {type && (
          <Type type={type} />
        )}
        {defaultValue && (
          <Default>{defaultValue.value.trim()}</Default>
        )}
        {otherName && (
          <Controllable other={otherName} propName={name} />
        )}
       </h3>
    );
  }
}

export const propFragment = graphql`
  fragment PropHeader_prop on ComponentProp {
    name
    defaultValue {
      value
      computed
    }
    doclets
    type {
      name
      value
      raw
    }
  }
`

export default PropHeader;
