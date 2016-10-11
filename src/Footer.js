import React from 'react';
import Button from './Button';
import { date as dateLocalizer } from './util/localizers';

export default function Footer({
  disabled,
  readOnly,
  value,
  onClick,
  culture,
  format
}) {
  return (
    <div className='rw-calendar-footer'>
      <Button
        disabled={!!(disabled || readOnly)}
        onClick={onClick.bind(null, value)}
      >
        {dateLocalizer.format(
          value,
          dateLocalizer.getFormat('footer', format),
          culture
        )}
      </Button>
    </div>
  );
}
