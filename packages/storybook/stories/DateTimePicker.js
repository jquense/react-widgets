import React from 'react'
import Layout from '@4c/layout'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Container from './Container'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import DatePicker from 'react-widgets/lib/DatePicker'
import TimeInput from 'react-widgets/lib/TimeInput'

const change = action('change')
storiesOf('TimePicker', module).add('TimePicker', () => (
  <Container direction="column" pad="4" align="flex-start">
    <input type="time" onChange={e => change(e.target.valueAsDate)} />
    <TimeInput use12HourClock padValues={false} onChange={change} />

    <TimeInput noClearButton onChange={change} />

    <Layout as="fieldset" direction="column" pad>
      <legend>Interaction</legend>
      <TimeInput use12HourClock disabled onChange={change} />
      <TimeInput use12HourClock readOnly onChange={change} />
    </Layout>

    <TimeInput onChange={change} />
    <TimeInput use12HourClock precision="milliseconds" onChange={change} />
    <TimeInput
      hoursAddon={<sub>h</sub>}
      minutesAddon={<sub>m</sub>}
      secondsAddon={<sub>s</sub>}
    />
  </Container>
))

storiesOf('DatePicker', module)
  .add('DatePicker', () => (
    <Container>
      <DatePicker />
    </Container>
  ))
  .add('default open', () => (
    <Container>
      <DatePicker defaultOpen />
    </Container>
  ))

storiesOf('DateTimePicker', module)
  .add('DateTimePicker', () => (
    <Container>
      <DateTimePicker />
    </Container>
  ))
  .add('open', () => (
    <Container>
      <DateTimePicker
        open
        timeInputProps={{ use12HourClock: true, noClearButton: true }}
      />
    </Container>
  ))

  .add('parsers', () => (
    <Container>
      <DateTimePicker format="MM/dd/yyyy" parse={d => new Date(d)} />
    </Container>
  ))
  .add('fieldset disabled', () => (
    <Container>
      <fieldset disabled>
        <legend>disabled Fieldset</legend>

        <DateTimePicker defaultValue={new Date()} />
      </fieldset>
    </Container>
  ))
  .add('current date', () => {
    class Story extends React.Component {
      onChange = value => this.setState({ value })

      render = () => (
        <Container>
          <DateTimePicker
            value={this.state && this.state.value}
            onChange={this.onChange}
          />
          <button onClick={() => this.onChange(new Date())}>change date</button>
        </Container>
      )
    }

    return <Story />
  })
