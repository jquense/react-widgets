import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
  icon: PropTypes.string.isRequired,
}

const Icon = ({ icon }) => (
  <span aria-hidden="true" className={`rw-i rw-i-${icon}`} />
)

Icon.propTypes = propTypes

export const caretUp = <Icon icon="caret-up" />
export const caretDown = <Icon icon="caret-down" />
export const chevronRight = <Icon icon="chevron-right" />
export const chevronLeft = <Icon icon="chevron-left" />
export const calendar = <Icon icon="calendar" />
export const clock = <Icon icon="clock-o" />
export const search = <Icon icon="search" />

export default Icon
