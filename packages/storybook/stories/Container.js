import React from 'react';

class Container extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        style={{
          width: 400,
          height: 500,
          display: 'flex',
          alignItems: 'center',
          margin: '30px auto',
          ...this.props.style,
        }}
      >
        <div style={{ flex: 1 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Container;
