import React from 'react'
import Layout from '@4c/layout'

class Container extends React.Component {
  render() {
    return (
      <Layout.Block
        {...this.props}
        style={{
          width: 400,
          margin: '200px auto',
          ...this.props.style,
        }}
      >
        {this.props.children}
      </Layout.Block>
    )
  }
}

export default Container
