import React from 'react';
import { storiesOf } from '@storybook/react';

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
  .add('right to left', () =>
    <Container>
      <Numberpicker
        {...props}
        isRtl
        defaultValue={2405}
      />
    </Container>
  )
  .add('format', () =>
    <Container>
      <Numberpicker
        {...props}
        min={250}
        format="d"
        defaultValue={2405.43534}
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
  .add('fieldset disabled', () =>
    <Container>
      <fieldset disabled>
        <legend>disabled Fieldset</legend>

        <Numberpicker
          {...props}
          defaultValue={2405}
        />
      </fieldset>
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
