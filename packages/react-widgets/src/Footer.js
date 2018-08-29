import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.instanceOf(Date),
  onClick: PropTypes.func.isRequired,
  localizer: PropTypes.object.isRequired,
}

export default function Footer({
  disabled,
  readOnly,
  value,
  onClick,
  localizer,
}) {
  return (
    <div className="rw-calendar-footer">
      <Button
        disabled={!!(disabled || readOnly)}
        onClick={onClick.bind(null, value)}
      >
        {localizer.formatDate(value, 'footer')}
      </Button>
    </div>
  )
}

Footer.propTypes = propTypes
