import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import DropdownList from 'react-widgets-virtualized/lib/DropdownList';

import 'react-widgets-virtualized/lib/styles.css';

let generateNames = global.generateNames;

let props = {
  data: generateNames(2000),
  valueField: 'id',
  textField: 'fullName',
  filter: true,
}


storiesOf('Virtualization', module)
  .add('DropdownList', () =>
    <Container>
      <DropdownList
        {...props}
        filter
      />
    </Container>
  )
  .add('DropdownList open', () =>
    <Container>
      <DropdownList
        {...props}
        open
      />
    </Container>
  )
  .add('DropdownList groupBy', () =>
    <Container>
      <DropdownList
        {...props}
        open
        groupBy="last"
      />
    </Container>
  )
  .add('Uniform type', () =>
    <Container>
      <DropdownList
        {...props}
        type="uniform"
      />
    </Container>
  )
  .add('Static item height', () =>
    <Container>
      <DropdownList
        {...props}
        open
        itemSizeGetter={() => 25}
      />
    </Container>
  )
  .add('Variable item height', () =>
    <Container>
      <DropdownList
        {...props}
        itemComponent={({ item, index }) => (
          <div>
            {item.fullName}
            {index % 2 === 0
              ? <div><em>subtitle</em></div>
              : null
            }
          </div>
        )}
      />
    </Container>
  );
