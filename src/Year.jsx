import React from 'react';
import cn from 'classnames';
import dates from './util/dates';
import config from './util/configuration';
import Btn  from './WidgetButton';
import _  from './util/_';
import CustomPropTypes from './util/propTypes';

var localizers = config.locale
var format = props => props.monthFormat || localizers.date.formats.month

let propTypes = {
  focusID:      React.PropTypes.string,
  culture:      React.PropTypes.string,
  value:        React.PropTypes.instanceOf(Date),
  focused:      React.PropTypes.instanceOf(Date),
  min:          React.PropTypes.instanceOf(Date),
  max:          React.PropTypes.instanceOf(Date),
  onChange:     React.PropTypes.func.isRequired,

  monthFormat:  CustomPropTypes.dateFormat
};

export default React.createClass({

  displayName: 'YearView',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/RtlChildContextMixin')
  ],

  propTypes,

  render(){
    let { className, focused } = this.props
      , months = dates.monthsInYear(dates.year(focused))
      , rows = _.chunk(months, 4);

    var elementProps = _.omit(this.props, Object.keys(propTypes));

    return (
      <table { ...elementProps}
        role='grid'
        className={cn(className, 'rw-nav-view')}
      >
        <tbody >
          { rows.map(this._row)}
        </tbody>
      </table>
    )
  },

  _row(row, rowIdx){
    let {
        focusID, id = this._id('_year')
      , focused, selected, disabled, onChange
      , value, today, culture, min, max
      , dayComponent: Day } = this.props
      , labelFormat = localizers.date.formats.header;


    return (
      <tr key={rowIdx} role='row'>
        { row.map( (date, i) => {
          var isFocused  = dates.eq(date, focused,  'month')
            , isSelected = dates.eq(date, value,  'month')
            , currentMonth = dates.eq(date, today, 'month')
            , label = localizers.date.format(date, labelFormat, culture);

          var optionID = id + '_' + rowIdx + '_month_' + i;

          optionID = isFocused ? (focusID || optionID) : optionID;

          return dates.inRange(date, min, max, 'month')
            ? (
              <td
                key={i}
                role='gridcell'
                id={optionID}
                title={label}
                aria-selected={isSelected}
                aria-readonly={disabled}
                aria-label={label}
              >
                <span
                  aria-labelledby={optionID}
                  onClick={onChange.bind(null, date)}
                  className={cn('rw-btn', {
                    'rw-state-focus':    isFocused,
                    'rw-state-selected': isSelected,
                    'rw-now':            currentMonth
                  })}
                >
                  {localizers.date.format(date, format(this.props), culture) }
                </span>
              </td>
            )
            : <td key={i} className='rw-empty-cell' role='presentation'>&nbsp;</td>
        })}
    </tr>)
  }

});
