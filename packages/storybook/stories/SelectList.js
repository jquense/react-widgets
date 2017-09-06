import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from './helpers';
import Container from './Container';
import SelectList from 'react-widgets/lib/SelectList';

let generateNames = global.generateNames;

let data = generateNames();
let props = {
  data,
  valueField: 'id',
  textField: 'fullName',
  onChange: action('change')
}

storiesOf('SelectList', module)
  .add('SelectList', () =>
    <Container>
      <SelectList
        {...props}
      />
    </Container>
  )
  .add('multiple', () =>
    <Container>
      <SelectList
        {...props}
        multiple
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  )
  .add('busy', () =>
    <Container>
      <SelectList
        {...props}
        busy
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  )
  .add('right to left', () =>
    <Container>
      <SelectList
        {...props}
        isRtl
        busy
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  )
  .add('disabled', () =>
    <Container>
      <SelectList
        {...props}
        disabled
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  )
  .add('fieldset disabled', () =>
    <Container>
      <fieldset disabled>
        <legend>disabled fieldset</legend>

        <SelectList
          {...props}
          defaultValue={props.data.slice(0, 3)}
        />
      </fieldset>
    </Container>
  )
  .add('disabled items', () =>
    <Container>
      <SelectList
        {...props}
        multiple
        defaultValue={[data[3]]}
        disabled={[data[3], data[5]]}
      />
    </Container>
  )
  .add('readonly', () =>
    <Container>
      <SelectList
        {...props}
        readOnly
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  )
  .add('Item component', () =>
    <Container>
      <SelectList
        {...props}
        defaultValue={props.data.slice(0, 3)}
        itemComponent={({ item }) =>
          <div>
            <div>{item.first}</div>
            <div>{item.last}</div>
          </div>
        }
      />
    </Container>
  )
