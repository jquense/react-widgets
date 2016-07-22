import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import DateTimePicker from '../src/DateTimePicker';

let generateNames = global.generateNames;



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
  .add('calendar', () => {
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
