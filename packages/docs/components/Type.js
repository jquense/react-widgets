import React from 'react'

export default function Type({ children }) {
  return (
    <span className='prop-header__type'>
      <span className='prop-header__label'>type: </span>{children}
    </span>
  );
}
