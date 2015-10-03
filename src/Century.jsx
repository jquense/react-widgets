import React      from 'react';
import cn         from 'classnames';
import dates      from './util/dates';
import config from './util/configuration';import _          from './util/_';
import CustomPropTypes from './util/propTypes';
import { instanceId } from './util/widgetHelpers';

let localizers   = config.locale;
let format = props => props.decadeFormat || localizers.date.formats.decade

let isEqual = (dateA, dateB) => dates.eq(dateA, dateB, 'decade')
let optionId = (id, date) => `${id}__century_${dates.year(date)}`;

let propTypes = {
  optionID:     React.PropTypes.func,
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
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlChildContextMixin'),
    require('./mixins/AriaDescendantMixin')()
  ],

  propTypes,

  componentDidUpdate() {
    let activeId = optionId(instanceId(this), this.props.focused);
    this.ariaActiveDescendant(activeId)
  },

  render(){
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
        focused, disabled, onChange
      , value, today, culture, min, max } = this.props
      , id = instanceId(this, '_century');

    return (
      <tr key={'row_' + rowIdx} role='row'>
        { row.map( (date, colIdx) => {
          var isFocused = isEqual(date, focused)
            , isSelected = isEqual(date, value)
            , currentDecade = isEqual(date, today)
            , label = localizers.date.format(
                dates.startOf(date, 'decade'), format(this.props), culture);

          var currentID = optionId(id, date);
          var emptyCellClass = !inRange(date, min, max) ? "rw-empty-cell" : ""
          return (
              <td
                key={colIdx}
                role='gridcell'
                id={currentID}
                title={label}
                aria-selected={isSelected}
                aria-label={label}
                aria-readonly={disabled}
                className={emptyCellClass}
              >
                <span
                  aria-labelledby={currentID}
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
