
import React from 'react';
import PropTypes from 'prop-types';
import Default from './Default';
import Controllable from './Controllable';
import Type from './Type';
import propId from './propId';

class ApiPropHeader extends React.Component {
  static contextTypes = {
    prefix: PropTypes.string.isRequired
  };

  render() {
    var {
         children
       , type
       , controllable
       , default: dflt } = this.props;

    let id = propId(this.context.prefix, children)

    return (
       <h3 className='prop-header' id={id}>
        <a href={'#' + id }>{children}</a>
        {type &&
          <Type>{type}</Type>
        }
        {dflt &&
          <Default>{dflt}</Default>
        }
        {controllable &&
          <Controllable other={controllable} propName={children} />
        }
       </h3>
    );
  }
}



module.exports = ApiPropHeader;
