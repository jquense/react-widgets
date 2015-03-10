'use strict';
var React = require('react');
var cn = require('classnames');
module.exports = React.createClass({

  render: function(){
    var { className, children, ...props} = this.props;

    return (
      <button {...props} type='button' className={cn(className, 'rw-btn')}>
        { children }
      </button>
    )
  }
})