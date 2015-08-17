'use strict';

module.exports = function() {

var code =
`
var MomentDateTimePicker = React.createClass({

  propTypes: {
    value: function(props, name){
      if( !moment.isMoment(props[name]))
        return new Error(\`\$\{name\} must be a moment.js date instance\`)
    }
  },

  render(){
    let {
        value
      , format = 'MM-DD-YYYY' // default format
      , onChange = ()=>{}     // noop
      , ...props } = this.props;

    let parser = dateStr =>
      dateStr ? moment(dateStr, format).toDate() : null;

    let formatter = date =>
      date ? moment(date).format(format) : '';

    return (
      <ReactWidgets.DateTimePicker
        {...props}
        /* convert the value to a normal date */
        value={value ? value.toDate() : null}
        /* convert back to a Moment instance */
        onChange={(date, str) => onChange(moment(date), str) }
        format={formatter}
        parse={parser}/>
    )
  },
})

ReactDOM.render(
    <MomentDateTimePicker value={moment()}/>
  , mountNode);`

return code
}