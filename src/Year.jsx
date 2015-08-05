'use strict';
import React from 'react';
import cx from 'classnames';
import dates from './util/dates';
import config from './util/configuration';
import Btn  from './WidgetButton';
import _  from './util/_';
import CustomPropTypes from './util/propTypes';

var localizers = config.locale
var format = props => props.monthFormat || localizers.date.formats.month

module.exports = React.createClass({

  displayName: 'YearView',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/RtlChildContextMixin')
  ],

  propTypes: {
    culture:      React.PropTypes.string,
    value:        React.PropTypes.instanceOf(Date),
    focused:      React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    onChange:     React.PropTypes.func.isRequired,

    monthFormat:  CustomPropTypes.dateFormat
  },


  render: function(){
    var props =  _.omit(this.props, ['max', 'min', 'value', 'onChange'])
      , months = dates.monthsInYear(dates.year(this.props.focused))
      , rows = _.chunk(months, 4);

    return (
      <table { ...props }
        role='grid'
        className='rw-calendar-grid rw-nav-view'
        aria-activedescendant={this._id('_selected_item')}>
        <tbody >
          { rows.map(this._row)}
        </tbody>
      </table>
    )
  },

  _row: function(row, i){
    var id = this._id('_selected_item');

    return (
      <tr key={i} role='row'>
      { row.map( (date, i) => {
        var focused  = dates.eq(date, this.props.focused,  'month')
          , selected = dates.eq(date, this.props.value,  'month')
          , currentMonth = dates.eq(date, this.props.today, 'month');

        return dates.inRange(date, this.props.min, this.props.max, 'month')
          ? (<td key={i} role='gridcell'>
              <Btn onClick={this.props.onChange.bind(null, date)} tabIndex='-1'
                id={focused ? id : undefined}
                aria-pressed={selected}
                aria-disabled={this.props.disabled || undefined}
                disabled={this.props.disabled}
                className={cx({
                  'rw-state-focus':    focused,
                  'rw-state-selected': selected,
                  'rw-now':            currentMonth
                })}>
                { localizers.date.format(date, format(this.props), this.props.culture) }
              </Btn>
            </td>)
          : <td key={i} className='rw-empty-cell' role='gridcell'>&nbsp;</td>
      })}
    </tr>)
  }

});
