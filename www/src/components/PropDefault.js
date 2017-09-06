import React from 'react'

export default function PropDefault({ children }) {
  return (
    <div className='prop-header__default'>
      <span className='prop-header__label'>default: </span>
      <code>{children}</code>
    </div>
  );
}
