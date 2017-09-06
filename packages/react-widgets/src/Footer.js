import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { date as dateLocalizer } from './util/localizers';
import * as CustomPropTypes from './util/PropTypes';

const propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.instanceOf(Date),
  onClick: PropTypes.func.isRequired,
  culture: PropTypes.string,
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
