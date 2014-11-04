/** @jsx React.DOM */
var React = require('react')
  , transferPropsTo = require('../util/transferProps').mergeIntoProps


module.exports = React.createClass({displayName: 'exports',

  render: function(){
    return transferPropsTo(this.props,
      React.DOM.button({type: "button", className: "rw-btn"}, 
        this.props.children
      )
      )
  }
})