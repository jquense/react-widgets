import React from 'react';
import { storiesOf } from '@storybook/react';

import _DropdownList from 'react-widgets/lib/DropdownList';
import withVirtualList from 'react-widgets-virtualized';

import Container from './Container';

import 'react-widgets-virtualized/lib/styles.css';

let DropdownList = withVirtualList(_DropdownList);

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
        defaultOpen
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
        defaultOpen
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
        defaultOpen
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
  )
  .add('Async incremental fetching', () =>
    <Container>
      <InfiniteFetch />
    </Container>
  );


class InfiniteFetch extends React.Component {
  state = { data: generateNames(30) }

  onRequestItems = ({ pageSize, currentIndex, searchTerm }) => {
    if (this.searchTerm != searchTerm) this.limit = 0;
    if (this.limit >= (currentIndex + pageSize)) return;

    this.limit = currentIndex + pageSize;
    this.searchTerm = searchTerm;
    this.setState({ busy: true })

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        busy: false,
        data: this.state.data.concat(generateNames(pageSize)),
      })
    }, 4000);
  };

  render() {
    return (
      <DropdownList
        {...props}
        busy={this.state.busy}
        data={this.state.data}
        hasNextPage={true}
        itemSizeGetter={() => 22}
        onRequestItems={this.onRequestItems}
      />
    )
  }
}
