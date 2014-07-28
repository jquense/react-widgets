var React = require('react')
  , Week  = require('./week.jsx')
  , cx = require('react/lib/cx')
  , dates = require('../util/dates')
  , moment = require('moment')
  , _ = require('lodash')


module.exports = React.createClass({

  propTypes: {
    culture:      React.PropTypes.array,
    date:         dates.PropTypes.moment,
    selected:     dates.PropTypes.moment,
    min:          dates.PropTypes.moment,
    max:          dates.PropTypes.moment,

    format:       React.PropTypes.string,
  },

  render: function(){
    return (
      <table>
        <thead>
          <tr>{ this._headers() }</tr>
        </thead>
        <tbody tabIndex='-1' onKeyUp={this._keyUp}>
          { this._body() }
        </tbody>
      </table>
    )
  },

  _onClick: function(date, idx){
    console.log(date, idx)
  },

  _body: function(){
    var month = dates.visibleDays(this.props.date)
      , rows  = chunk(month, 7 );

    return _.map(rows, week => (
      <Week 
        days={week} 
        selected={this.props.selected}
        month={moment(this.props.date).month()}
        year={moment(this.props.date).year()}
        min={this.props.min}
        max={this.props.max}
        onClick={this._onClick}/>))
  },


  _headers: function(format){
    var days = dates.daysOfWeek(this.props.date, format);

    return _.map(days, function(day){
      return (<th>{day}</th>)
    })
  },

  // _keyPress: function(e){
  //   var key = e.key
  //     , alt = e.altKey
  //     , isOpen = this.state.open;

  //   if ( key === 'ArrowDown' ) {
  //     if ( !isOpen )
  //       alt ? this.open() : this.next()
  //   }
      

  //   else if ( key === 'ArrowUp' )
  //     if ( isOpen && alt ) this.close()
  //     else if( !isOpen)    this.prev()
  // },

});


/**
 * @license
 * Lo-Dash 3.0.0-pre <http://lodash.com/>
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
function chunk(array, chunkSize) {
  var index = 0,
      length = array ? array.length : 0,
      result = [];

  chunkSize = Math.max(+chunkSize || 1, 1);

  while (index < length)
    result.push(array.slice(index, (index += chunkSize)));
  
  return result;
}