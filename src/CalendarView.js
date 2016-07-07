import React from 'react';
import cn from 'classnames';

import dates from './util/dates';

const VIEW_UNITS = ['month', 'year', 'decade', 'century'];

function clamp(date, min, max){
  return dates.max(dates.min(date, max), min)
}

class CalendarView extends React.Component {
  render() {
    let { className } = this.props;

    return (
      <table
        {...this.props}
        role='grid'
        tabIndex='-1'
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
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    today: React.PropTypes.instanceOf(Date),
    selected: React.PropTypes.instanceOf(Date),
    focused: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),
    unit: React.PropTypes.oneOf(['day', ...VIEW_UNITS]),
    viewUnit: React.PropTypes.oneOf(VIEW_UNITS),
    onChange: React.PropTypes.func.isRequired
  };

  isEqual(date) {
    return dates.eq(this.props.date, date, this.props.unit)
  }

  isEmpty() {
    let { unit, min, max, date } = this.props;
    return !dates.inRange(date, min, max, unit)
  }

  isNow() {
    return this.isEqual(this.props.now)
  }

  isFocused() {
    return this.isEqual(this.props.focused)
  }

  isSelected() {
    return this.isEqual(this.props.selected)
  }

  isOffView() {
    let { viewUnit, focused, date } = this.props;
    return viewUnit && dates[viewUnit](date) !== dates[viewUnit](focused);
  }

  handleChange = () => {
    let { onChange, min, max, date } = this.props;
    onChange(clamp(date, min, max))
  }

  render()  {
    let { children, id, label, disabled } = this.props;

    if (this.isEmpty()) {
      return <td className='rw-empty-cell' role='presentation'>&nbsp;</td>
    }

    return (
      <td
        role='gridcell'
        id={id}
        title={label}
        aria-label={label}
        aria-readonly={disabled}
        aria-selected={this.isSelected()}
      >
        <span
          aria-labelledby={id}
          onClick={this.handleChange}
          className={cn(
            'rw-btn',
            this.isNow() && 'rw-now',
            this.isOffView() && 'rw-off-range',
            this.isFocused() && 'rw-state-focus',
            this.isSelected() && 'rw-state-selected'
          )}
        >
          {children}
        </span>
      </td>
    )
  }
}

CalendarView.Row = props => <tr role='row' {...props} />;
CalendarView.Cell = CalendarViewCell;

export default CalendarView;
