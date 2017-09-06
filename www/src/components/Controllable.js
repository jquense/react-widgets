import React from 'react';

import PropTypes from 'prop-types';

function defaultKey(key){
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1)
}

function Controllable({ other, propName }) {
  let isProp = other.slice(0, 2) === 'on';

 other = <code><a href={`#${other}`}>{other}</a></code>

  if (isProp) {
    return (
      <div>
        <div className='prop-header__controllable'>
          <span className='prop-header__label'>initialized with: </span>
          <code>{defaultKey(propName)}</code>
        </div>
        <div className='prop-header__controllable'>
          <span className='prop-header__label'>controlled by: </span>
          {other}
        </div>
      </div>
    )
  }
  return (
    <div className='prop-header__controllable'>
      <span className='prop-header__label'>controls: </span>
      {other}
    </div>
  )
}

Controllable.propTypes = {
  other: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired
};


export default Controllable
