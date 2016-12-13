import React from 'react'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import propId from './propId'


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
     <MenuItem className="prop-item" href={'#' + propId(prefix, children)}>
      {children}
     </MenuItem>
  );
}

ApiMenuItem.propTypes = propTypes;
ApiMenuItem.contextTypes = contextTypes;


module.exports = ApiMenuItem;
