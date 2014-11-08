'use strict';
var React = require('react')
  , Default = require('../default.jsx')
  , Example = require('../example.jsx')
  , DDButton = require('../../bootstrap').DropdownButton
  , MenuItem = require('../../bootstrap').MenuItem
  , CalendarExample = require('../examples/calendar.jsx');

var prefix = 'calendar/'
var Calendar = React.createClass({

  render: function() {
    return (
      <section {...this.props}>
        <h1 className="page-header">
          Calendar
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem href={'#' + prefix + 'value'}>value</MenuItem>
              <MenuItem href={'#' + prefix + 'onChange'}>onChange</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'min'}>min</MenuItem>
              <MenuItem href={'#' + prefix + 'max'}>max</MenuItem>
              <MenuItem href={'#' + prefix + 'initialView'}>initialView</MenuItem>
              <MenuItem href={'#' + prefix + 'finalView'}>finalView</MenuItem>

              <MenuItem href={'#' + prefix + 'duration'}>duration</MenuItem>
              <MenuItem href={'#' + prefix + 'isRtl'}>isRtl</MenuItem>
              <MenuItem href={'#' + prefix + 'messages'}>messages</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'keyboard'}>Keyboard Navigation</MenuItem>
            </DDButton>
          </span>
        </h1>
        <p>
          Calendar widget.
        </p>
        <CalendarExample/>
        <Example code={
          "render: function(){\n"+
          "  //... \n\n" +
          "  return (\n"+
          "    <Calendar \n"+
          "      value={this.state.value}\n"+
          "      onChange={this._change}/>\n"+
          "   \n"+
          "    <Calendar \n"+
          "      ...\n"+
          "      min={new Date(2014, 0, 1)}\n"+
          "      max={new Date(2015, 12, 15)}/>\n"+
          "    \n"+
          "    <Calendar \n"+
          "      ...\n"+
          "      initialView='year'\n"+
          "      finalView='decade'/>\n"+
          "   \n"+
          "}"
        }/>

        <h2>Props</h2>
        <h3 className='prop-header' id={ prefix +"value" }>
          value <small>Date</small><strong>controllable (onChange, defaultValue)</strong></h3>
        <p>
          The current selected date, should be a Date object or null.
        </p>

        <h3 className='prop-header' id={ prefix +"onChange" }>
          onChange <small>{'Function( Date value )'}</small></h3>
        <p>
          change event Handler that is called when the value is changed. The handler is called with the Date object
        </p>

        <h3 className='prop-header' id={ prefix +"min" }>
          min <small>Date</small></h3>
        <p>
          The minimum date that the Calendar can navigate from.
        </p>

        <h3 className='prop-header' id={ prefix +"max" }>
          max <small>Date</small></h3>
        <p>
          The maximum date that the Calendar can navigate to.
        </p>

        <h3 className='prop-header' id={ prefix +"initialView" }>

          initialView <small>Enum<Default>"month"</Default></small>
        </h3>
        <p>
          The starting and lowest level view the calendar can navigate down to.
        </p>
        <p>
          Acceptable values are:
          <code>"month"</code> <code>"year"</code> <code>"decade"</code> <code>"century"</code>
        </p>
        <h3 className='prop-header' id={ prefix +"finalView" }>
          finalView <small>Enum<Default>"century"</Default></small>
        </h3>
        <p>
          The highest level view the calendar can navigate up to. This value should be higher
          than <code>initialView</code>
        </p>
        <p>
          Acceptable values are:
          <code>"month"</code> <code>"year"</code> <code>"decade"</code> <code>"century"</code>
        </p>
        <h3 className='prop-header' id={ prefix +"isRtl" }>
          isRtl <small>Boolean<Default>false</Default></small></h3>
        <p>
          mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
          a <code>childContext</code> prop (<code>isRtl</code>) this allows higher level application components to specify the direction.
        </p>

        <h3 className='prop-header' id={ prefix +"messages" }>
          messages <small>Object</small></h3>
        <p>
          Object hash containing display text and/or text for screen readers. Use the <code>messages</code> object to
          localize widget text and increase accessibility.
        </p>
        <h3>messages.moveBack <small>String<Default>"navigate back"</Default></small></h3>
        <p>
          title and screen reader text for the left arrow button
        </p>
        <h3>
          messages.moveForward <small>String<Default>"navigate forward"</Default></small>
        </h3>
        <p>
          title and screen reader text for the right arrow button
        </p>

        <h2 id={ prefix +"keyboard" }>Keyboard Navigation</h2>

        <ul className='list-unstyled keyboard-list'>
          <li><kbd>ctrl + down arrow</kbd> navigate to next view </li>
          <li><kbd>ctrl + up arrow</kbd> navigate to previous view </li>

          <li><kbd>ctrl + left arrow</kbd> navigate to previous: month, year, decade, century</li>
          <li><kbd>ctrl + right arrow</kbd> navigate to next: month, year, decade, century</li>

          <li><kbd>left arrow</kbd> move focus to previous date</li>
          <li><kbd>right arrow</kbd> move focus to next date</li>
          <li><kbd>up arrow</kbd> move focus up within view</li>
          <li><kbd>down arrow</kbd> move focus down within view</li>
        </ul>
      </section>
    );
  }

});

module.exports = Calendar;