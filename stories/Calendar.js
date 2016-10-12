import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import Calendar from '../src/Calendar';

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
  .add('no animation', () =>
    <Container>
      <Calendar duration={0} />
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
