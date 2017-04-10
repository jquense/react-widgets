import React from 'react';

import PropTypes from 'prop-types';

import DateTimePicker from './DateTimePicker';

const propTypes = {
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

class TimePicker extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.toggleState = props.defaultOpen
  }

  handleToggle = (open) => {
    this.toggleState = !!open;

    if (this.props.onToggle)
      this.props.onToggle(this.toggleState)
    else
      this.forceUpdate()
  }

  render() {
    let { open } = this.props;
    open = open === undefined ? this.toggleState : open;

    return (
      <DateTimePicker
        {...this.props}
        date={false}
        open={open ? 'time' : open}
        onToggle={this.handleToggle}
      />
    );
  }
}

TimePicker.propTypes = propTypes;

export default TimePicker
