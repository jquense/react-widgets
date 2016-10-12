
import React from 'react';
import Default from './Default';
import Controllable from './Controllable';
import Type from './Type';
import propId from './propId';

let ApiPropHeader = React.createClass({

  contextTypes: {
    prefix: React.PropTypes.string.isRequired
  },

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
  },

  localizable(prop, localizers) {
    let locales = localizers.reduce((obj, l) => {
      obj[l] = require('../../src/localizers/' + l)
      return obj
    }, {})

    let select = e => locales[e.target.value]()

    return (
      <span>
        <select>
          {
            localizers.map(l => <option>{l}</option>)
          }
        </select>
      </span>
    )
  }

});



module.exports = ApiPropHeader;
