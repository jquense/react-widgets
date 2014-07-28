var React = require('react')
  , cx = require('react/lib/cx')
  , dates = require('../util/dates')
  , Day    = require('./day.jsx')
  , transferProps = require('../util/transferProps')
  , _ = require('lodash')


module.exports = React.createClass({

  propTypes: {
    days:       React.PropTypes.arrayOf(React.PropTypes.instanceOf(Date)),
    selected:   React.PropTypes.instanceOf(Date),
    month:      React.PropTypes.number,
    year:       React.PropTypes.number,
  },

  getInitialState: function(){
    return {
      hovering: null,
      focused:  null
    }
  },

  render: function(){
    var self = this;

    return transferProps(
      _.omit(this.props, 'days', 'onClick'),
      
      <tr>{ _.map(this.props.days, (day, idx) => (
        !dates.inRange(day, this.props.min, this.props.max)
            ? <td className='rw-empty-cell'>&nbsp;</td>
            : <Day 
                className={cx({
                  'rw-state-hover'   : idx === this.state.hovering, 
                  'rw-state-focused' : idx === this.state.focused,
                  'rw-state-selected': dates.eq(day, this.props.selected, 'day'),
                })}
                onMouseEnter={_.partial(this._onHover, idx)}
                onMouseLeave={_.partial(this._onHover, null)}
                key={idx} 
                value={day} 
                month={this.props.month}
                year={this.props.year}
                onClick={_.partial(this.props.onClick, day) }/>
      ))}
      </tr>
    )
  },

  _onClick: function(date, index){
    this.props.onClick(date, index)
  },

  _onHover: function(idx, e){
    this.setState({ hovering: idx })
  },
})