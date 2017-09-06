import React from 'react';
import { storiesOf } from '@storybook/react';

import Container from './Container';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DatePicker from 'react-widgets/lib/DatePicker';
import TimePicker from 'react-widgets/lib/TimePicker';

let generateNames = global.generateNames;


storiesOf('TimePicker', module)
  .add('TimePicker', () =>
    <Container>
      <TimePicker />
    </Container>
  )

storiesOf('DatePicker', module)
  .add('DatePicker', () =>
    <Container>
      <DatePicker />
    </Container>
  )
  .add('default open', () =>
    <Container>
      <DatePicker
        defaultOpen
      />
    </Container>
  )

storiesOf('DateTimePicker', module)
  .add('DateTimePicker', () =>
    <Container>
      <DateTimePicker
      />
    </Container>
  )
  .add('time', () =>
    <Container>
      <DateTimePicker
        open="time"
      />
    </Container>
  )

  .add('calendar', () =>
    <Container>
      <DateTimePicker
        open="date"
      />
    </Container>
  )
  .add('parsers', () =>
    <Container>
      <DateTimePicker
        time={false}
        format='MM/dd/yyyy'
        parse={['f', d => new Date(d)]}
      />
    </Container>
  )
  .add('fieldset disabled', () =>
    <Container>
      <fieldset disabled>
        <legend>disabled Fieldset</legend>

        <DateTimePicker defaultValue={new Date()}/>
      </fieldset>
    </Container>
  )
  .add('current date', () => {
    class Story extends React.Component {

      onChange = value =>
        this.setState({ value });

      render = () => (
        <Container>
          <DateTimePicker
            value={this.state && this.state.value}
            onChange={this.onChange}
          />
          <button onClick={()=> this.onChange(new Date()) }>
            change date
          </button>
        </Container>
      )
    }

    return <Story />
  })
