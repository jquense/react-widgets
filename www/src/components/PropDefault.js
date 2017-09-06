import React from 'react'

export default function Default({ children }) {
  return (
    <div className='prop-header__default'>
      <span className='prop-header__label'>default: </span>
      <code>{children}</code>
    </div>
  );
}
