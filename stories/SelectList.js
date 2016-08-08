import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import SelectList from '../src/SelectList';

let generateNames = global.generateNames;

let props = {
  data: generateNames(),
  valueField: 'id',
  textField: 'fullName'
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
  .add('disabled items', () =>
    <Container>
      <SelectList
        {...props}
        disabled={props.data[2]}
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
