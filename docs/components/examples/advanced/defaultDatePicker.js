'use strict';

module.exports = function() {

var code = 
`
var CustomDateTimePicker = React.createClass({

  getDefaultProps(){
    return {
      parse: dateStr => Moment(dateStr, this.props.format),

      format: 'MM-DD-YYYY'
    }
  },

  render(){

    return <ReactWidgets.DateTimePicker {...this.props}/>
  },
})

React.render(<Example/>, mountNode);`

return code
}