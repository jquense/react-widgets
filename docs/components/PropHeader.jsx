'use strict';
var React = require('react')
  , Default = require('./default.jsx');

var PropTypes = require('prop-types');

var ApiPropHeader = React.createClass({

  contextTypes: {
    prefix: PropTypes.string.isRequired
  },

  render: function() {
    var {
         children
       , handler
       , type
       , controllable
       , ...props } = this.props;

    var id = this.context.prefix + children.replace(' ', '_')

    return (
       <h3 className='prop-header' id={`/${id}`}>
        <a href={'#/' + id }>
        { children }
        { type &&
          <small>
            { type }
            { props.default &&
              <Default>{props.default}</Default>
            }
          </small>
        }
        { controllable &&
          <strong>{`controllable (${handler}, ${defaultKey(children)})`}</strong>
        }
        </a>
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
