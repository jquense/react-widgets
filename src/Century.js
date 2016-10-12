import React from 'react';

import CalendarView from './CalendarView';
import dates  from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import { chunk } from './util/_';
import * as Props from './util/Props';
import CustomPropTypes from './util/propTypes';

let format = props => dateLocalizer.getFormat('decade', props.decadeFormat)

class CenturyView extends React.Component {

  static propTypes = {
    activeId: React.PropTypes.string,
    culture: React.PropTypes.string,
    today: React.PropTypes.instanceOf(Date),
    value: React.PropTypes.instanceOf(Date),
    focused: React.PropTypes.instanceOf(Date),
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func.isRequired,
    decadeFormat: CustomPropTypes.dateFormat,
    disabled: React.PropTypes.bool,
  };

  render(){
    let { focused, activeId } = this.props;

    return (
      <CalendarView
        {...Props.omitOwn(this)}
        activeId={activeId}
      >
        <CalendarView.Body>
          {chunk(getCenturyDecades(focused), 4)
            .map(this.renderRow)
          }
        </CalendarView.Body>
      </CalendarView>
    )
  }

  renderRow = (row, rowIdx) => {
    let {
        focused
      , activeId
      , disabled
      , onChange
      , value
      , today
      , culture
      , min
      , max } = this.props


    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {

          let label = dateLocalizer.format(
              dates.startOf(date, 'decade')
            , format(this.props)
            , culture
          )

          return (
            <CalendarView.Cell
              key={colIdx}
              unit="decade"
              activeId={activeId}
              label={label}
              date={date}
              now={today}
              min={min}
              max={max}
              onChange={onChange}
              focused={focused}
              selected={value}
              disabled={disabled}
            >
              {label}
            </CalendarView.Cell>
          )
        })}
      </CalendarView.Row>
    )
  }
}

function getCenturyDecades(_date){
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    , date = dates.add(dates.startOf(_date, 'century'), -20, 'year')

  return days.map(() => (date = dates.add(date, 10, 'year')))
}

export default CenturyView;
