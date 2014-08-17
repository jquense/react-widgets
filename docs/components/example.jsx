var React = require('react/addons')
  , _ = require('lodash');


module.exports = React.createClass({

  getDefaultProps: function(){
    return {
      language: 'javascript'
    }
  },

  render: function(){
    return (
      <pre>
        <code className={ 'language-' + this.props.language}>
          {this.props.code}
        </code>
      </pre>
    )
  }
})