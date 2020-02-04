import React from 'react'
import Listbox from 'react-widgets/lib/Listbox'
import { storiesOf } from '@storybook/react'
import Container from './Container'
import { action } from './helpers'

let generateNames = global.generateNames

let data = generateNames()
let props = {
  data,
  dataKey: 'id',
  textField: 'fullName',
  onChange: action('change'),
}

storiesOf('Listbox', module)
  .add('Listbox', () => (
    <Container style={{ height: 300 }}>
      <input />
      <Listbox {...props} />
    </Container>
  ))
  .add('multiple', () => (
    <Container>
      <Listbox {...props} multiple defaultValue={props.data.slice(0, 3)} />
    </Container>
  ))
  .add('busy', () => (
    <Container>
      <Listbox {...props} busy defaultValue={props.data.slice(0, 3)} />
    </Container>
  ))
  .add('right to left', () => (
    <Container>
      <Listbox {...props} isRtl busy defaultValue={props.data.slice(0, 3)} />
    </Container>
  ))
  .add('disabled', () => (
    <Container>
      <Listbox {...props} disabled defaultValue={props.data.slice(0, 3)} />
    </Container>
  ))
  .add('fieldset disabled', () => (
    <Container>
      <fieldset disabled>
        <legend>disabled fieldset</legend>

        <Listbox {...props} defaultValue={props.data.slice(0, 3)} />
      </fieldset>
    </Container>
  ))
  .add('disabled items', () => (
    <Container>
      <Listbox
        {...props}
        multiple
        defaultValue={[data[3]]}
        disabled={[data[3], data[5]]}
      />
    </Container>
  ))
  .add('readonly', () => (
    <Container>
      <Listbox {...props} readOnly defaultValue={props.data.slice(0, 3)} />
    </Container>
  ))
  .add('Item component', () => (
    <Container>
      <Listbox
        {...props}
        defaultValue={props.data.slice(0, 3)}
        renderItem={({ item }) => (
          <div>
            <div>{item.first}</div>
            <div>{item.last}</div>
          </div>
        )}
      />
    </Container>
  ))
