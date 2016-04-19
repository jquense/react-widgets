'use strict';

module.exports = function(widgetName) {

var code =
`
var ${widgetName} = ReactWidgets.${widgetName};

var DayComponent = React.createClass({
  render() {
    var date = this.props.date
      , style = { backgroundColor: date < new Date() && '#F57B7B' }

    return (<div style={style}>
        {this.props.label}
      </div>);
  }
})

var widget = (
    <${widgetName}
      dayComponent={DayComponent}/>
  )

ReactDOM.render(widget, mountNode);`

return code
}


