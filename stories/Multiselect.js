import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import Multiselect from '../src/Multiselect';

let generateNames = global.generateNames;

let props = {
  data: generateNames(),
  valueField: 'id',
  textField: 'fullName'
}

storiesOf('Multiselect', module)
  .add('Multiselect', () =>
    <Container>
      <Multiselect
        {...props}
      />
    </Container>
  )
  .add('busy', () =>
    <Container>
      <Multiselect
        {...props}
        busy
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  )
  .add('right to left', () =>
    <Container>
      <Multiselect
        {...props}
        isRtl
        busy
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  )
