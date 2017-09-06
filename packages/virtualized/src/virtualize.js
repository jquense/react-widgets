import React from 'react';

import VirtualList, { virtualListPropTypes } from './VirtualList';

export default function virtualize(Widget) {
  let name = Widget.name || Widget.displayName || 'Widget';
  name = name[0] + name.slice(1);

  return class extends React.Component {
    static displayName = `Virtual${name}`;

    static propTypes = virtualListPropTypes;

    render() {
      const { listProps, props } = VirtualList.getVirtualListProps(this.props)

      return (
        <Widget
          {...props}
          listComponent={VirtualList}
          listProps={listProps}
        />
      )
    }
  }
}
