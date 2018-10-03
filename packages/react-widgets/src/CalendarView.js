import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import dates from './util/dates'
import * as A11y from './util/A11y'
import focusManager from './util/focusManager'

const VIEW_UNITS = ['month', 'year', 'decade', 'century']

function clamp(date, min, max) {
  return dates.max(dates.min(date, max), min)
}

class CalendarView extends React.Component {
  static propTypes = {
    activeId: PropTypes.string,
    focusedItem: PropTypes.any,
    onKeyDown: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(...args) {
    super(...args)

    this.state = { focused: false }

    this.focusManager = focusManager(this, {})
    this.ref = React.createRef()
  }

  componentDidUpdate({ focusedItem }) {
    const { focused } = this.state
    const node = this.ref.current
    const changedFocus = focusedItem !== this.props.focusedItem
    if (!node) return

    if (focused && changedFocus) {
      node.querySelector('.rw-cell[tabindex]').focus()
    }
    if (!focused || changedFocus)
      A11y.setActiveDescendant(
        node,
        this.props.activeId,
        this.props.focusedItem,
      )
  }

  handleKeyDown = event => {
    // TODO: should be in
    if (event.key === 'Enter') {
      event.preventDefault()
      return this.props.onChange(this.props.focusedItem)
    }

    this.props.onKeyDown(event)
  }

  render() {
    let { className, focusedItem: _0, activeId: _1, ...props } = this.props

    return (
      <table
        {...props}
        role="grid"
        ref={this.ref}
        tabIndex="-1"
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        className={cn(className, 'rw-nav-view', 'rw-calendar-grid')}
      />
    )
  }
}

class CalendarViewCell extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    activeId: PropTypes.string.isRequired,
    label: PropTypes.string,
    now: PropTypes.instanceOf(Date),
    date: PropTypes.instanceOf(Date),
    selected: PropTypes.instanceOf(Date),
    focusedItem: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    unit: PropTypes.oneOf(['day', ...VIEW_UNITS]),
    viewUnit: PropTypes.oneOf(VIEW_UNITS),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }

  handleChange = () => {
    let { onChange, min, max, date } = this.props
    onChange(clamp(date, min, max))
  }

  isEmpty() {
    let { unit, min, max, date } = this.props
    return !dates.inRange(date, min, max, unit)
  }

  isEqual(date) {
    return dates.eq(this.props.date, date, this.props.unit)
  }

  isFocused() {
    return (
      !this.props.disabled &&
      !this.isEmpty() &&
      this.isEqual(this.props.focusedItem)
    )
  }

  isNow() {
    return this.props.now && this.isEqual(this.props.now)
  }

  isOffView() {
    let { viewUnit, focusedItem, date } = this.props
    return (
      date &&
      focusedItem &&
      viewUnit &&
      dates[viewUnit](date) !== dates[viewUnit](focusedItem)
    )
  }

  isSelected() {
    return this.props.selected && this.isEqual(this.props.selected)
  }

  render() {
    let { children, label, disabled, activeId } = this.props
    let isDisabled = disabled || this.isEmpty()
    let isFocused = this.isFocused()

    return (
      <td
        role="gridcell"
        title={label}
        id={isFocused ? activeId : null}
        aria-label={label}
        aria-readonly={disabled}
        aria-selected={this.isSelected()}
        tabIndex={isFocused ? 0 : null}
        onClick={!isDisabled ? this.handleChange : undefined}
        className={cn(
          'rw-cell',
          this.isNow() && 'rw-now',
          isDisabled && 'rw-state-disabled',
          this.isEmpty() && 'rw-cell-not-allowed',
          this.isOffView() && 'rw-cell-off-range',
          this.isSelected() && 'rw-state-selected',
        )}
      >
        <span aria-hidden>{children}</span>
      </td>
    )
  }
}

CalendarView.Body = props => <tbody className="rw-calendar-body" {...props} />
CalendarView.Row = props => (
  <tr role="row" className="rw-calendar-row" {...props} />
)
CalendarView.Cell = CalendarViewCell

export default CalendarView
