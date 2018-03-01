import React from 'react'
import { storiesOf } from '@storybook/react'

import { action } from './helpers'
import Container from './Container'
import Calendar from 'react-widgets/lib/Calendar';
import Dropdown from 'react-widgets/lib/DropdownList'
import Grow from 'material-ui/transitions/Grow'

let generateNames = global.generateNames

let props = {
  data: generateNames(),
  valueField: 'id',
  textField: 'fullName',
}

function Grow2(props) {
  return (
    <Grow
      {...props}
      style={{ ...props.style, transformOrigin: 'top right' }}
    />
  )
}
function MuiDropdown(props) {
  return <Dropdown {...props} popupTransition={Grow2} />
}

storiesOf('Material design', module)
  .add('MuiDropdown', () => (
    <Container>
      <MuiDropdown {...props} filter={false} />
    </Container>
  ))
  .add('open', () => (
    <Container>
      <MuiDropdown {...props} open filter="contains" />
    </Container>
  ))
  .add('Create option', () => (
    <Container>
      <Calendar style={{ width: 300 }} />
    </Container>
  ))
  .add('Create option: always', () => (
    <Container>
      <MuiDropdown {...props} allowCreate onCreate={action('onCreate')} />
    </Container>
  ))
  .add('no filter', () => (
    <Container>
      <MuiDropdown {...props} open filter={false} />
    </Container>
  ))
  .add('drop up', () => (
    <Container>
      <MuiDropdown {...props} dropUp open filter />
    </Container>
  ))
  .add('busy', () => (
    <Container>
      <MuiDropdown {...props} busy defaultValue={props.data[1]} />
    </Container>
  ))
  .add('right to left', () => (
    <Container>
      <MuiDropdown {...props} isRtl busy defaultValue={props.data[1]} />
    </Container>
  ))
  .add('ellipsis', () => (
    <Container>
      <MuiDropdown
        {...props}
        style={{ width: 80 }}
        defaultValue={props.data[1]}
      />
    </Container>
  ))
  .add('grouped', () => (
    <Container>
      <MuiDropdown
        {...props}
        open
        defaultValue={props.data[1]}
        groupBy="last"
      />
    </Container>
  ))
  .add('disabled', () => (
    <Container>
      <MuiDropdown {...props} disabled defaultValue={props.data[1]} />
    </Container>
  ))
  .add('fieldset disabled', () => (
    <Container>
      <fieldset disabled>
        <legend>disabled Fieldset</legend>

        <MuiDropdown {...props} defaultValue={props.data[1]} />
      </fieldset>
    </Container>
  ))
  .add('disabled items', () => (
    <Container>
      <MuiDropdown
        {...props}
        defaultOpen
        filter
        disabled={[props.data[2]]}
        defaultValue={props.data[1]}
      />
    </Container>
  ))
  .add('disabled item, first focused', () => (
    <Container>
      <MuiDropdown {...props} defaultOpen disabled={props.data.slice(0, 2)} />
    </Container>
  ))
  .add('readonly', () => (
    <Container>
      <MuiDropdown {...props} readOnly defaultValue={props.data[1]} />
    </Container>
  ))
