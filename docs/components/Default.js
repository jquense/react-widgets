import React from 'react'

export default function Default({ children }) {
  return (
    <span className='prop-header__default'>
      {'(default: ' + children + ')'}
    </span>
  );
}
