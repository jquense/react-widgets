import React, { useState } from 'react'
import Calendar from 'react-widgets/Calendar'
import { storiesOf } from '@storybook/react'
import Container from '../Container'

storiesOf('Calendar', module)
  .add('Calendar', () => (
    <Container>
      <Calendar />
    </Container>
  ))
  .add('min', () => (
    <Container>
      <Calendar min={new Date()} />
    </Container>
  ))
  .add('max', () => (
    <Container>
      <Calendar max={new Date()} />
    </Container>
  ))
  .add('disabled', () => (
    <Container>
      <Calendar disabled />
    </Container>
  ))
  .add('readOnly', () => (
    <Container>
      <Calendar readOnly />
    </Container>
  ))
  .add('views', () => (
    <Container>
      <Calendar views={['year', 'decade']} />
    </Container>
  ))
  .add('defaultView', () => (
    <Container>
      <Calendar defaultView="decade" />
    </Container>
  ))
  .add('current date', () => {
    function Story() {
      const [value, setValue] = useState<Date>()
      return (
        <Container>
          <Calendar value={value} onChange={setValue} />
          <button onClick={() => setValue(new Date())}>change date</button>
        </Container>
      )
    }

    return <Story />
  })
