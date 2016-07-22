import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import Combobox from '../src/Combobox';

let generateNames = global.generateNames;

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
  .add('busy', () =>
    <Container>
      <Combobox
        {...props}
        busy
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
