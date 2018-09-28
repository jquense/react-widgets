import React from 'react';
import Layout from '@4c/layout';

class Container extends React.Component {
  render() {
    return (
      <Layout
        align="center"
        style={{
          width: 400,
          height: 500,
          margin: '30px auto',
          ...this.props.style,
        }}
      >
        <Layout grow {...this.props}>
          {this.props.children}
        </Layout>
      </Layout>
    );
  }
}

export default Container;
