'use strict';
var React = require('react');
var EditableExample = require('../EditableExample')

var AdvancedPage = React.createClass({

  render(){

    return (
      <section {...this.props}>
        <h1></h1>
      </section>
    )
  }
})

module.exports = AdvancedPage