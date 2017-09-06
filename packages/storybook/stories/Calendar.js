import React from 'react';
import { storiesOf } from '@storybook/react';

import Container from './Container';
import Calendar from 'react-widgets/lib/Calendar';

let generateNames = global.generateNames;


storiesOf('Calendar', module)
  .add('Calendar', () =>
    <Container>
      <Calendar />
    </Container>
  )
  .add('min', () =>
    <Container>
      <Calendar min={new Date()} />
    </Container>
  )
  .add('max', () =>
    <Container>
      <Calendar max={new Date()}  />
    </Container>
  )
  .add('disabled', () =>
    <Container>
      <Calendar disabled />
    </Container>
  )
  .add('readOnly', () =>
    <Container>
      <Calendar readOnly />
    </Container>
  )
  .add('views', () =>
    <Container>
      <Calendar views={['year', 'decade']} />
    </Container>
  )
  .add('defaultView', () =>
    <Container>
      <Calendar defaultView="decade" />
    </Container>
  )
  .add('current date', () => {
    class Story extends React.Component {

      onChange = value =>
        this.setState({ value });

      render = () => (
        <Container>
          <Calendar
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
