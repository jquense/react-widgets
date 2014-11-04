/** @jsx React.DOM */
var React = require('react')


module.exports = React.createClass({displayName: 'exports',

  render: function(){
    return this.transferPropsTo(
      React.DOM.button({type: "button", className: "rw-btn"}, 
        this.props.children
      )
      )
  }
})