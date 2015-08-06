import React from 'react';
import cn from 'classnames';
import dates from './util/dates';
import config from './util/configuration'
import CustomPropTypes from './util/propTypes';
import _   from './util/_';
import Btn from './WidgetButton';

var localizers = config.locale
  , dayFormat = props => props.dayFormat || localizers.date.formats.weekday
  , dateFormat = props => props.dateFormat || localizers.date.formats.dayOfMonth

let propTypes = {
  focusID:          React.PropTypes.string,

  culture:          React.PropTypes.string,
  value:            React.PropTypes.instanceOf(Date),
  focused:          React.PropTypes.instanceOf(Date),
  min:              React.PropTypes.instanceOf(Date),
  max:              React.PropTypes.instanceOf(Date),

  dayComponent:     CustomPropTypes.elementType,

  dayFormat:        CustomPropTypes.dateFormat,
  dateFormat:       CustomPropTypes.dateFormat,
  footerFormat:     CustomPropTypes.dateFormat,

  onChange:         React.PropTypes.func.isRequired
};

export default React.createClass({

  displayName: 'MonthView',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/RtlChildContextMixin')
  ],

  propTypes,

  render(){
    var { className, focused, focusID, culture } = this.props
      , month = dates.visibleDays(focused, culture)
      , rows  = _.chunk(month, 7);

    var elementProps = _.omit(this.props, Object.keys(propTypes));

    return (
      <table {...elementProps}
        role='grid'
        aria-activedescendant={focusID}
      >
        <thead>
          <tr>{this._headers(dayFormat(this.props), culture)}</tr>
        </thead>
        <tbody>
          {rows.map(this._row)}
        </tbody>
      </table>
    )
  },

  _row(row, i){
    let {
        focusID, id = this._id('_month')
      , focused, selected, disabled, onChange
      , value, today, culture, min, max
      , dayComponent: Day } = this.props
      , labelFormat = localizers.date.formats.footer;

    return (
      <tr key={'week_' + i} role='row'>
        { row.map( (day, idx) => {

          var isFocused  = dates.eq(day, focused, 'day')
            , isSelected = dates.eq(day, value, 'day')
            , today = dates.eq(day, today, 'day')
            , date = localizers.date.format(day, dateFormat(this.props), culture)
            , label = localizers.date.format(day, labelFormat, culture);

          var optionID = id + '_week_' + i + '_day_' + idx;
          optionID = isFocused ? (focusID || optionID) : optionID;

          return !dates.inRange(day, min, max)
              ? <td  key={'day_' + idx} role='presentation' className='rw-empty-cell'>&nbsp;</td>
              : (
                <td
                  key={'day_' + idx}
                  role='gridcell'
                  id={optionID}
                  title={label}
                  aria-selected={isSelected}
                  aria-label={label}
                  aria-readonly={disabled}
                >
                  <span
                    aria-labelledby={optionID}
                    onClick={onChange.bind(null, day)}
                    className={cn('rw-btn', {
                      'rw-off-range':      dates.month(day) !== dates.month(focused),
                      'rw-state-focus':    isFocused,
                      'rw-state-selected': isSelected,
                      'rw-now': today
                    })}
                  >
                    {
                      Day
                        ? <Day date={day} label={date}/>
                        : date
                    }
                  </span>
                </td>
              )
        })}
      </tr>
    )
  },

  _headers: function(format, culture){
    return [0, 1, 2, 3, 4, 5, 6].map( (day) =>
      <th key={'header_' + day }>{ localizers.date.format(day, format, culture) }</th>)
  }

});
