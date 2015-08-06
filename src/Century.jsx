import React      from 'react';
import cn         from 'classnames';
import dates      from './util/dates';
import config from './util/configuration';import _          from './util/_';
import CustomPropTypes from './util/propTypes';

let localizers   = config.locale;
let format = props => props.decadeFormat || localizers.date.formats.decade

let propTypes = {
  culture:      React.PropTypes.string,
  value:        React.PropTypes.instanceOf(Date),
  min:          React.PropTypes.instanceOf(Date),
  max:          React.PropTypes.instanceOf(Date),

  onChange:     React.PropTypes.func.isRequired,
  decadeFormat: CustomPropTypes.dateFormat
};

export default React.createClass({

  displayName: 'CenturyView',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlChildContextMixin')
  ],

  propTypes,

  render: function(){
    let { className, focused } = this.props
      , years = getCenturyDecades(focused)
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

  _row(row, rowIdx) {
    let {
        focusID, id = this._id('_century')
      , focused, selected, disabled, onChange
      , value, today, culture, min, max } = this.props;

    return (
      <tr key={'row_' + rowIdx} role='row'>
        { row.map( (date, i) => {
          var isFocused  = dates.eq(date,  focused,  'decade')
            , isSelected = dates.eq(date, value,  'decade')
            , currentDecade = dates.eq(date, today, 'decade')
            , label = localizers.date.format(
                dates.startOf(date, 'decade'), format(this.props), culture);

          var optionID = id + '_' + rowIdx + '_decade_' + i

          optionID = isFocused ? (focusID || optionID) : optionID;

          return !inRange(date, min, max)
            ? <td key={i} role='gridcell' className='rw-empty-cell'>&nbsp;</td>
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
                  onClick={onChange.bind(null, inRangeDate(date, min, max))}
                  className={cn('rw-btn', {
                    'rw-off-range':       !inCentury(date, focused),
                    'rw-state-focus':     isFocused,
                    'rw-state-selected':  isSelected,
                    'rw-now':             currentDecade
                   })}
                >
                  { label }
                </span>
              </td>
            )
        })}
    </tr>)
  }

});

function inRangeDate(decade, min, max){
  return dates.max( dates.min(decade, max), min)
}

function inRange(decade, min, max){
  return dates.gte(decade, dates.startOf(min, 'decade'), 'year')
      && dates.lte(decade, dates.endOf(max, 'decade'),  'year')
}

function inCentury(date, start){
  return dates.gte(date, dates.startOf(start, 'century'), 'year')
      && dates.lte(date, dates.endOf(start, 'century'),  'year')
}

function getCenturyDecades(_date){
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    , date = dates.add(dates.startOf(_date, 'century'), -20, 'year')

  return days.map(() => (date = dates.add(date, 10, 'year')))
}
