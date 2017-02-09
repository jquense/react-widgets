import React from 'react';

import VirtualList, { virtualListPropTypes } from './VirtualList';

export default function virtualize(Widget) {
  let name = Widget.name || Widget.displayName || 'Widget';
  name = name[0] + name.slice(1);

  return class extends React.Component {
    static displayName = `Virtual${name}`;

    static propTypes = virtualListPropTypes;

    render() {
      let {
        type,
        itemSizeGetter,
        itemSizeEstimator,
        pageSize = 20,
        threshold = 300,
        useStaticSize,
        useTranslate3d,
        ...props } = this.props;

      return (
        <Widget
          {...props}
          listComponent={VirtualList}
          listProps={{
            type,
            itemSizeGetter,
            itemSizeEstimator,
            pageSize,
            threshold,
            useStaticSize,
            useTranslate3d,
          }}
        />
      )
    }
  }
}
