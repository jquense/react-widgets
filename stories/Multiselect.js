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
        defaultValue={props.data.slice(0, 2)}
      />
    </Container>
  )
  .add('Create tags', () =>
    <Container>
      <Multiselect
        {...props}
        onCreate={()=>{}}
        defaultValue={props.data.slice(0, 2)}
      />
    </Container>
  )
  .add('open', () =>
    <Container>
      <Multiselect
        {...props}
        open
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
  .add('disabled', () =>
    <Container>
      <Multiselect
        {...props}
        disabled
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  )
  .add('readonly', () =>
    <Container>
      <Multiselect
        {...props}
        readOnly
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  )
  .add('long tags', () =>
    <Container>
      <Multiselect
        style={{ width: 200 }}
        defaultValue={['john jacob jingleheimer schmidt']}
      />
    </Container>
  )
  .add('tag component', () =>
    <Container>
      <Multiselect
        {...props}
        tagComponent={({ item }) =>
          <span>
            <strong>{item.first}</strong>
            {' '}
            <em>{item.last}</em>
          </span>
        }
        defaultValue={props.data.slice(0, 3)}
      />
    </Container>
  )
