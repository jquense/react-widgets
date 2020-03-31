import React from 'react'

import PropTypes from 'prop-types'

import DateTimePicker, { DateTimePickerProps } from './DateTimePicker'

const propTypes = {
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onToggle: PropTypes.func,
} as React.WeakValidationMap<DatePickerProps>

interface DatePickerProps extends DateTimePickerProps {
  open?: boolean
  defaultOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

class DatePicker extends React.Component<DatePickerProps> {
  static propTypes = propTypes

  toggleState: boolean | undefined
  constructor(props: DatePickerProps, context: any) {
    super(props, context)

    this.toggleState = props.defaultOpen
  }

  handleToggle = (open: boolean) => {
    this.toggleState = !!open

    if (this.props.onToggle) this.props.onToggle(this.toggleState)
    else this.forceUpdate()
  }

  render() {
    let { open } = this.props
    open = open === undefined ? this.toggleState : open

    return (
      <DateTimePicker
        {...this.props}
        open={open}
        includeTime={false}
        onToggle={this.handleToggle}
      />
    )
  }
}

export default DatePicker
