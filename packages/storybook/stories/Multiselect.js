import React from 'react'
import { storiesOf } from '@storybook/react'

import { action } from './helpers'
import Container from './Container'
import Multiselect from 'react-widgets/lib/Multiselect'

let generateNames = global.generateNames

let props = {
  data: generateNames(),
  valueField: 'id',
  textField: 'fullName',
  onChange: action('change'),
}

storiesOf('Multiselect', module)
  .add('Multiselect', () => (
    <Container>
      <Multiselect {...props} defaultValue={props.data.slice(0, 2)} />
    </Container>
  ))
  .add('Create tags', () => (
    <Container>
      <Multiselect
        {...props}
        onCreate={action('onCreate')}
        defaultValue={props.data.slice(0, 2)}
      />
    </Container>
  ))
  .add('Create tags: always', () => (
    <Container>
      <Multiselect
        {...props}
        allowCreate
        onCreate={action('onCreate')}
        defaultValue={props.data.slice(0, 2)}
      />
    </Container>
  ))
  .add('open', () => (
    <Container>
      <Multiselect {...props} open />
    </Container>
  ))
  .add('busy', () => (
    <Container>
      <Multiselect {...props} busy defaultValue={props.data.slice(0, 3)} />
    </Container>
  ))
  .add('right to left', () => (
    <Container>
      <Multiselect
        {...props}
        isRtl
        busy
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  ))
  .add('disabled', () => (
    <Container>
      <Multiselect {...props} disabled defaultValue={props.data.slice(0, 3)} />
    </Container>
  ))
  .add('fieldset disabled', () =>
    <Container>
      <fieldset disabled>
        <legend>disabled fieldset</legend>

        <Multiselect
          {...props}
          defaultValue={props.data.slice(0, 3)}
        />
      </fieldset>
    </Container>
  )
  .add('disabled tags', () => (
    <Container>
      <Multiselect
        {...props}
        disabled={props.data.slice(2, 3)}
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  ))
  .add('readonly', () => (
    <Container>
      <Multiselect {...props} readOnly defaultValue={props.data.slice(0, 3)} />
    </Container>
  ))
  .add('long tags', () => (
    <Container>
      <Multiselect
        style={{ width: 200 }}
        defaultValue={['joe', 'john jacob jingleheimer schmidt']}
      />
    </Container>
  ))
  .add('tag component', () => (
    <Container>
      <Multiselect
        {...props}
        tagComponent={({ item }) => (
          <span>
            <strong>{item.first}</strong>
            {' '}
            <em>{item.last}</em>
          </span>
        )}
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  ))
