import React from 'react';

class Container extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        style={{
          width: 400,
          margin: '30px auto',
          ...this.props.style,
        }}
      />
    );
  }
}

export default Container;
