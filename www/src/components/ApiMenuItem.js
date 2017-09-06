import React from 'react'
import PropTypes from 'prop-types';
import MenuItem from 'react-bootstrap/lib/MenuItem'


const propTypes = {
  divider: PropTypes.bool,
};

const contextTypes = {
  prefix: PropTypes.string.isRequired,
};

function ApiMenuItem({ divider, children }) {
  if (divider)
    return <MenuItem divider />

  return (
     <MenuItem className="prop-item" href={`#${children}`}>
      {children}
     </MenuItem>
  );
}

ApiMenuItem.propTypes = propTypes;
ApiMenuItem.contextTypes = contextTypes;

export default ApiMenuItem;
