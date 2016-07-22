import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import DropdownList from '../src/DropdownList';

let generateNames = global.generateNames;

let props = {
  data: generateNames(),
  valueField: 'id',
  textField: 'fullName'
}

storiesOf('DropdownList', module)
  .add('DropdownList', () =>
    <Container>
      <DropdownList
        {...props}
        filter="contains"
      />
    </Container>
  )
  .add('busy', () =>
    <Container>
      <DropdownList
        {...props}
        busy
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('right to left', () =>
    <Container>
      <DropdownList
        {...props}
        isRtl
        busy
        defaultValue={props.data[1]}
      />
    </Container>
  )
