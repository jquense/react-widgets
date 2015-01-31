'use strict';
var React = require('react')
  , Default = require('./default.jsx');

var ApiPropHeader = React.createClass({

  contextTypes: {
    prefix: React.PropTypes.string.isRequired
  },

  render: function() {
    var { 
         children
       , handler
       , type
       , controllable
       , ...props } = this.props;


    return (
       <h3 className='prop-header' id={`/${this.context.prefix + children.replace(' ', '_')}`}>
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
       </h3>
    );
  }

});

function defaultKey(key){
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1)
}

module.exports = ApiPropHeader;