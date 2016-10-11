'use strict';
var React = require('react')
  , MenuItem = require('react-bootstrap/lib/MenuItem');


const propTypes = {
  divider: React.PropTypes.bool,
};

const contextTypes = {
  prefix: React.PropTypes.string.isRequired,
};

function ApiMenuItem({ divider, children }, { prefix }) {
  if (divider)
    return <MenuItem divider={true}></MenuItem>

  return (
     <MenuItem className="prop-item" href={'#/' + prefix + children.replace(' ', '_')}>
      {children}
     </MenuItem>
  );
}

ApiMenuItem.propTypes = propTypes;
ApiMenuItem.contextTypes = contextTypes;


module.exports = ApiMenuItem;
