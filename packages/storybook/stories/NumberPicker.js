import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { action } from './helpers';
import Container from './Container';
import Numberpicker from 'react-widgets/lib/NumberPicker';

let generateNames = global.generateNames;

let props = {
  onChange: action('change')
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
  .add('min', () =>
    <Container>
      <Numberpicker
        {...props}
        min={250}
        defaultValue={2405}
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
