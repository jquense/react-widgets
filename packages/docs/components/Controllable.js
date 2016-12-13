import React from 'react';

import propId from './propId';

function defaultKey(key){
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1)
}

function Controllable({ other, propName }, { prefix }) {
  let isProp = other.slice(0, 2) === 'on';

  other = <code><a href={'#' + propId(prefix, other)}>{other}</a></code>

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
  other: React.PropTypes.string.isRequired,
  propName: React.PropTypes.string.isRequired
};

Controllable.contextTypes = {
  prefix: React.PropTypes.string.isRequired
};

export default Controllable
