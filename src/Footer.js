import React from 'react';
import Button from './Button';
import { date as dateLocalizer } from './util/localizers';
import CustomPropTypes from './util/propTypes';

const propTypes = {
  disabled: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  value: React.PropTypes.instanceOf(Date),
  onClick: React.PropTypes.func.isRequired,
  culture: React.PropTypes.string,
  format: CustomPropTypes.dateFormat,
}

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

Footer.propTypes = propTypes;
