import React from 'react';
import cn from 'classnames';

function Layout({
  children,
  className,
  style,
  flex,
  wrap,
  inline = false,
  direction = 'row',
  pad = true,
  align = 'stretch',
  alignSelf,
  justify
}) {
  return (
    <div
      className={cn(
        className,
        pad && `layout-pad-${direction}`
      )}
      style={flex !== false ? {
        ...style,
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: direction,
        flexWrap: wrap === true ? 'wrap' : wrap,
        alignItems: align,
        flex: flex === true ? 1 : flex,
        alignSelf,
        justifyContent: justify,
      } : { ...style, alignSelf }}
    >
      {children}
    </div>
  );
}

export default Layout;
