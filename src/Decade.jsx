import React from 'react';
import cn from 'classnames';
import dates from './util/dates';
import config from './util/configuration';
import Btn  from './WidgetButton';
import _  from './util/_';
import CustomPropTypes from './util/propTypes';

var localizers = config.locale

var format = props => props.yearFormat || localizers.date.formats.year

let propTypes = {
  focusID:      React.PropTypes.string,
  culture:      React.PropTypes.string,

  value:        React.PropTypes.instanceOf(Date),
  focused:      React.PropTypes.instanceOf(Date),
  min:          React.PropTypes.instanceOf(Date),
  max:          React.PropTypes.instanceOf(Date),
  onChange:     React.PropTypes.func.isRequired,

  yearFormat:   CustomPropTypes.dateFormat
};

export default React.createClass({

  displayName: 'DecadeView',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlChildContextMixin')
  ],

  propTypes,

  render(){
    let { className, focused } = this.props
      , years = getDecadeYears(focused)
      , rows = _.chunk(years, 4);

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
        focusID, id = this._id('_decade')
      , focused, selected, disabled, onChange
      , value, today, culture, min, max
      , dayComponent: Day } = this.props;

    return (
      <tr key={'row_' + rowIdx} role='row'>
      {
        row.map((date, i) => {
          var isFocused = dates.eq(date, focused,  'year')
            , isSelected = dates.eq(date, value,  'year')
            , currentYear = dates.eq(date, today, 'year')
            , label = localizers.date.format(date, format(this.props), culture);

          var optionID = id + '_' + rowIdx + '_year_' + i

          optionID = isFocused ? (focusID || optionID) : optionID;

          return !dates.inRange(date, min, max, 'year')
            ? <td key={i} role='presentation' className='rw-empty-cell'>&nbsp;</td>
            : (
              <td
                key={i}
                role='gridcell'
                id={optionID}
                title={label}
                aria-selected={isSelected}
                aria-label={label}
                aria-readonly={disabled}
              >
                <span
                  aria-labelledby={optionID}
                  onClick={onChange.bind(null, date)}
                  className={cn('rw-btn', {
                    'rw-off-range':      !inDecade(date, focused),
                    'rw-state-focus':    isFocused,
                    'rw-state-selected': isSelected,
                    'rw-now':            currentYear
                  })}
                >
                  {
                    label
                  }
                </span>
              </td>
            )
        })}
    </tr>
    )
  }
});

function inDecade(date, start){
  return dates.gte(date, dates.startOf(start, 'decade'), 'year')
      && dates.lte(date, dates.endOf(start, 'decade'),  'year')
}

function getDecadeYears(_date){
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    , date = dates.add(dates.startOf(_date, 'decade'), -2, 'year')

  return days.map(() => date = dates.add(date, 1, 'year'))
}
