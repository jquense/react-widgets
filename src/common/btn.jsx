var React = require('react')
  , transferPropsTo = require('../util/transferProps').mergeIntoProps


module.exports = React.createClass({

  render: function(){
    return transferPropsTo(this.props,
      <button type='button' className='rw-btn'>
        {this.props.children}
      </button>
      )
  }
})