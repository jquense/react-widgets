var React = require('react')


module.exports = React.createClass({

  render: function(){
    return this.transferPropsTo(
      <button type='button' className='rw-btn'>
        {this.props.children}
      </button>
      )
  }
})