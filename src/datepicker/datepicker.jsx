var React = require('react')
  , cx = require('react/lib/cx')
  , Popup = require('../popup/popup.jsx')
  , Calendar = require('./calendar.jsx')
  , moment = require('moment')


module.exports = React.createClass({

  propTypes: {
    culture:      React.PropTypes.array,
    min:          React.PropTypes.string,
    max:          React.PropTypes.string,

    format:       React.PropTypes.string,
  },

  getInitialState: function(){
    return {
      selectedIndex: 0,
      open:          false
    }
  },

  getDefaultProps: function(){
    return {
      min: new Date(1900,0, 1),
      max: new Date(2099,11, 31),
    }
  },

  render: function(){
    return null
  }
});