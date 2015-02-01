'use strict';
var React = require('react');

module.exports = React.createClass({

  render: function(){
    var { className, ...props } = this.props;

    return (
      <button {...props} type='button' className={(className  || '') + ' rw-btn'}>
        {this.props.children}
      </button>
    )
  }
})