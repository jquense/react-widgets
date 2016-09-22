
import React from 'react';
import Default from './Default';

let ApiPropHeader = React.createClass({

  contextTypes: {
    prefix: React.PropTypes.string.isRequired
  },

  render: function() {
    var {
         children
       , handler
       , type
       , controllable
       , default: dflt } = this.props;

    var id = this.context.prefix + children.replace(' ', '_')

    return (
       <h3 className='prop-header' id={`/${id}`}>
        <a href={'#/' + id }>
          <span>{children}</span>
          {dflt &&
            <Default>{dflt}</Default>
          }

          {controllable &&
            <div className='prop-header__controllable'>
              {`controllable (${handler}, ${defaultKey(children)})`}
            </div>
          }
        </a>
        {type &&
          <div className='prop-header__type'>
            {type}

          </div>
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

function defaultKey(key){
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1)
}

module.exports = ApiPropHeader;
