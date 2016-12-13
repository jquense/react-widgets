import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import Numberpicker from '../src/NumberPicker';

let generateNames = global.generateNames;

let props = {

}

storiesOf('Numberpicker', module)
  .add('Numberpicker', () =>
    <Container>
      <Numberpicker
        {...props}
      />
    </Container>
  )
  .add('filter', () =>
    <Container>
      <Numberpicker
        {...props}
        open
        filter="contains"
      />
    </Container>
  )
  .add('right to left', () =>
    <Container>
      <Numberpicker
        {...props}
        isRtl
        defaultValue={2405}
      />
    </Container>
  )
  .add('ellipsis', () =>
    <Container>
      <Numberpicker
        {...props}
        style={{ width: 80 }}
        defaultValue={2405}
      />
    </Container>
  )
  .add('grouped', () =>
    <Container>
      <Numberpicker
        {...props}
        defaultOpen
        defaultValue={2405}
        groupBy="last"
      />
    </Container>
  )
  .add('disabled', () =>
    <Container>
      <Numberpicker
        {...props}
        disabled
        defaultValue={2405}
      />
    </Container>
  )
  .add('readonly', () =>
    <Container>
      <Numberpicker
        {...props}
        readOnly
        defaultValue={2405}
      />
    </Container>
  )
