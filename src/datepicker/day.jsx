var React = require('react')
  , cx = require('react/lib/cx')
  , dates = require('../util/dates')
  , transferProps = require('../util/transferProps')
  , _ = require('lodash')


module.exports = React.createClass({

  propTypes: {
    value:  dates.PropTypes.moment,
    month:  React.PropTypes.number,
    year:   React.PropTypes.number,
  },

  render: function(){
    var day = this.props.value
      , props = _.omit(this.props, 'value');

    return transferProps(props,
      <td className={cx({ 
          'rw-off-month': day.month() !== this.props.month
        })}>
        {day.format('D')}
      </td>
    )
  }
})