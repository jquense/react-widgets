import React from 'react'
import Combobox from 'react-widgets/lib/Combobox'
import { storiesOf } from '@storybook/react'
import Container from './Container'

let suggestList = [
  { id: 1, fullName: 'Jimmy' },
  { id: 2, fullName: 'jim' },
  { id: 3, fullName: 'James' },
  { id: 4, fullName: 'Jamie' },
  { id: 5, fullName: 'Jamal' },
  { id: 6, fullName: 'Jason' },
  { id: 7, fullName: 'John' },
]

let props = {
  data: generateNames(),
  dataKey: 'id',
  textField: 'fullName',
}

function Disabled() {
  const [disabled, setDisabled] = React.useState(false)
  return (
    <Container>
      <Combobox {...props} disabled={disabled} defaultValue={props.data[1]} />
      <button onClick={() => setDisabled(s => !s)}>toggle</button>
    </Container>
  )
}
storiesOf('Combobox', module)
  .add('Combobox', () => (
    <Container>
      <Combobox {...props} value={props.data[3]} open filter="contains" />
    </Container>
  ))
  .add('suggestions', () => (
    <Container>
      <Combobox dataKey="id" textField="fullName" data={suggestList} />
    </Container>
  ))
  .add('busy', () => (
    <Container>
      <Combobox {...props} busy defaultValue={props.data[1]} />
    </Container>
  ))
  .add('disabled', () => <Disabled />)
  .add('fieldset disabled', () => (
    <Container>
      <fieldset disabled>
        <legend>disabled Fieldset</legend>

        <Combobox {...props} defaultValue={props.data[1]} />
      </fieldset>
    </Container>
  ))
  .add('disabled items', () => (
    <Container>
      <Combobox
        {...props}
        open
        disabled={[props.data[2]]}
        defaultValue={props.data[1]}
      />
    </Container>
  ))
  .add('disabled item, first focused', () => (
    <Container>
      <Combobox {...props} open disabled={props.data.slice(0, 2)} />
    </Container>
  ))
  .add('readOnly', () => (
    <Container>
      <Combobox {...props} readOnly defaultValue={props.data[1]} />
    </Container>
  ))
  .add('right to left', () => (
    <Container>
      <Combobox {...props} isRtl busy defaultValue={props.data[1]} />
    </Container>
  ))
