import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import Combobox from '../src/Combobox';

let generateNames = global.generateNames;

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
  valueField: 'id',
  textField: 'fullName'
}

storiesOf('Combobox', module)
  .add('Combobox', () =>
    <Container>
      <Combobox
        {...props}
        open
        filter="contains"
      />
    </Container>
  )
  .add('suggestions', () =>
    <Container>
      <Combobox
        suggest
        valueField="id"
        textField="fullName"
        data={suggestList}
      />
    </Container>
  )
  .add('busy', () =>
    <Container>
      <Combobox
        {...props}
        busy
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('disabled', () =>
    <Container>
      <Combobox
        {...props}
        disabled
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('readOnly', () =>
    <Container>
      <Combobox
        {...props}
        readOnly
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('right to left', () =>
    <Container>
      <Combobox
        {...props}
        isRtl
        busy
        defaultValue={props.data[1]}
      />
    </Container>
  )
