import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import dates from './util/dates';

const VIEW_UNITS = ['month', 'year', 'decade', 'century'];

function clamp(date, min, max) {
  return dates.max(dates.min(date, max), min)
}

class CalendarView extends React.Component {
  static propTypes = {
    activeId: PropTypes.string,
  };

  render() {
    let { className, activeId, ...props } = this.props;

    return (
      <table
        {...props}
        role='grid'
        tabIndex='-1'
        aria-activedescendant={activeId || null}
        className={cn(
          className,
          'rw-nav-view',
          'rw-calendar-grid'
        )}
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
    focused: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    blocked: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    noWeekends: PropTypes.bool,
    unit: PropTypes.oneOf(['day', ...VIEW_UNITS]),
    viewUnit: PropTypes.oneOf(VIEW_UNITS),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  isEqual(date) {
    return dates.eq(this.props.date, date, this.props.unit)
  }

  isEmpty() {
    let { unit, min, max, date } = this.props;
    return !dates.inRange(date, min, max, unit)
  }

  isBlocked() {
    let { blocked, date, noWeekends } = this.props;

    if (noWeekends) {
      if (date.getDay() == 6 || date.getDay() == 0) {
        return true;
      }
    }

    return dates.inArray(blocked, date)
  }



  isNow() {
    return this.props.now && this.isEqual(this.props.now)
  }

  isFocused() {
    return (
      !this.props.disabled &&
      !this.isEmpty() &&
      !this.isBlocked() &&
      this.isEqual(this.props.focused)
    )
  }

  isSelected() {
    return this.props.selected && this.isEqual(this.props.selected)
  }

  isOffView() {
    let { viewUnit, focused, date } = this.props;
    return (
      date &&
      focused &&
      viewUnit &&
      dates[viewUnit](date) !== dates[viewUnit](focused)
    )
  }

  handleChange = () => {
    let { onChange, min, max, date } = this.props;
    onChange(clamp(date, min, max))
  }

  render() {
    let { children, activeId, label, disabled } = this.props;
    let isDisabled = disabled || this.isEmpty() || this.isBlocked();

    return (
      <td
        role='gridcell'
        id={this.isFocused() ? activeId : null}
        title={label}
        aria-label={label}
        aria-readonly={disabled}
        aria-selected={this.isSelected()}
        onClick={!isDisabled ? this.handleChange : undefined}
        className={cn(
          'rw-cell',
          this.isNow() && 'rw-now',
          isDisabled && 'rw-state-disabled',
          this.isEmpty() || this.isBlocked() && 'rw-cell-not-allowed',
          this.isOffView() && 'rw-cell-off-range',
          this.isFocused() && 'rw-state-focus',
          this.isSelected() && 'rw-state-selected'
        )}
      >
        {children}
      </td>
    )
  }
}

CalendarView.Body = props => <tbody className='rw-calendar-body' {...props} />;
CalendarView.Row = props => <tr role='row' {...props} />;
CalendarView.Cell = CalendarViewCell;

export default CalendarView;
