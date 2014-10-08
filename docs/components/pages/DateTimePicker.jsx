/**
 * @jsx React.DOM
 */

var React = require('react')
  , Example = require('../example.jsx')
  , DDButton = require('react-bootstrap/DropdownButton')
  , MenuItem = require('react-bootstrap/MenuItem')
  , DatePickerExample = require('../examples/datepicker.jsx');

var prefix = 'date-picker/'
var DateTimePicker = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">
          Date and Time Picker
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem href={'#' + prefix + 'value'}>value</MenuItem>
              <MenuItem href={'#' + prefix + 'onChange'}>onChange</MenuItem>
              <MenuItem href={'#' + prefix + 'data'}>data</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'calendar'}>calendar</MenuItem>
              <MenuItem href={'#' + prefix + 'time'}>time</MenuItem>
              <MenuItem href={'#' + prefix + 'min'}>min</MenuItem>
              <MenuItem href={'#' + prefix + 'max'}>max</MenuItem>
              <MenuItem href={'#' + prefix + 'format'}>format</MenuItem>
              <MenuItem href={'#' + prefix + 'parse'}>parse</MenuItem>
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
          Datepicker widget. Allows you to {'set'} different parts of a javascript <code>Date</code> object. Since dates 
          are <em>highly</em> localized we make use of the 
          excellent <a target='_blank' href="https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468">Globalize.js</a> library 
          internally to format and parse dates from Strings. It is up to you to {'set'} the culture via 
          the <code>Globalize.culture()</code> method. All format props expect Globalize compatible format string.
          <br/><br/>
          <strong>
            Note: we expect a pre 1.0.0 version as  1.0 will dramatically change the Globalize API, once 1.0 is stable we 
            will switch to it as well
          </strong>
        </p>

        <p>
          Dates are never mutated but always return and operate on a new Date instance. When the <code>calendar</code> prop 
          is {'set'} the widget takes all props vailable to the Calendar widget (see above), 
          the same is true for the keyboard navigation!
        </p>
        <DatePickerExample/>
        <Example code={
          "render: function(){\n"+
          "  //... \n\n" +
          "  return (\n"+
          "    <DatePicker \n"+
          "      value={this.state.value}\n"+
          "      onChange={this._change}/>\n"+
          "   \n"+
          "    <DatePicker \n"+
          "      ...\n"+
          "      time={false}\n"+
          "      format='MMM dd yyyy'\n"+
          "      min={new Date(2014, 0, 1)}\n"+
          "      max={new Date(2015, 12, 15)}/>\n"+
          "   \n"+
          "    <DatePicker \n"+
          "      ...\n"+
          "      calendar={false}\n"+
          "      format='H:mm tt'\n"+
          "   )\n"+
          "}"
        }/>

        <h2>Props</h2>
        <h3 className='prop-header' id={ prefix +"value" }>
          value <small>Date</small></h3>
        <p>
          The current selected date, should be a <code>Date</code> instance or <code>null</code>.
        </p>

        <h3 className='prop-header' id={ prefix +"onChange" }>
          onChange <small>{'function ( date, stringDate )'}</small></h3>
        <p>
          change event Handler that is called when the value is changed. The handler is called with both the 
          current <code>Date</code> object (or null if it was not parseable), and the second argument is 
          a <code>string</code> representation of the date value, formated by the <code>format</code> prop.
        </p>

        <h3 className='prop-header' id={ prefix +"calendar" }>
          calendar <small>Boolean</small><span className='default'>true</span></h3>
        <p>
          Whether to show the date picker button.
        </p>

        <h3 className='prop-header' id={ prefix +"time" }>
          time <small>Boolean</small><span className='default'>true</span></h3>
        <p>
          Whether to show the time picker button.
        </p>

        <h3 className='prop-header' id={ prefix +"min" }>
          min <small>Date</small></h3>
        <p>
          The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that 
          can be typed or pasted into the widget. If you need this behavior you can constrain values via 
          the <code>onChange</code> handler.
        </p>

        <h3 className='prop-header' id={ prefix +"max" }>
          max <small>Date</small></h3>
        <p>
          The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that 
          can be typed or pasted into the widget. If you need this behavior you can constrain values via 
          the <code>onChange</code> handler.
        </p>

        <h3 className='prop-header' id={ prefix +"format" }>
          format <small>String</small><span className='default'>"M/d/yyyy h:mm tt"</span></h3>
        <p>
          A string format used to display the date value. For more information on prefined and custom formats 
          visit the <a href='https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468#dates'>
            Globalize.js documentation <i className="fa fa-external-link"></i>
          </a>
        </p>

        <h3 className='prop-header' id={ prefix +"parse" }>
          parse <small>Function, Array - Strings</small></h3>
        <p>
          Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try, 
          or provide a {'function'} that returns a date to handle parsing yourself
        </p>
        <h3 className='prop-header' id={ prefix +"initialView" }>
          initialView <small>One of - "month", "year", "decade", "century"</small>
          <span className='default'>"month"</span>
        </h3>
        <p>
          The starting and lowest level view the calendar can navigate down to.
        </p>

        <h3 className='prop-header' id={ prefix +"finalView" }>
          finalView <small>One of - "month", "year", "decade", "century"</small>
          <span className='default'>"century"</span>
        </h3>

        <h3 className='prop-header' id={ prefix +"duration" }>
          duration <small>Number</small> <span className='default'>250</span></h3>
        <p>
          The speed, in milliseconds, of the either dropdown animation.
        </p>
        <h3 className='prop-header' id={ prefix +"isRtl" }>
          isRtl <small>Boolean</small></h3>
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
        <h3>messages.calendarButton <small>String</small><span className='default'>"Select Date"</span></h3>
        <p>
          title and screen reader text for the left arrow button
        </p>
        <h3>messages.timeButton <small>String</small><span className='default'>"Select Time"</span></h3>
        <p>
          title and screen reader text for the right arrow button
        </p>

        <h2 id={ prefix +"keyboard" }>Keyboard Navigation</h2>

        <ul className='list-unstyled keyboard-list'>
          <li><strong>All Calendar keys above also apply</strong></li>
          <li><kbd>alt + down arrow</kbd> open calendar or times</li>
          <li><kbd>alt + up arrow</kbd> close calendar or times</li>

          <li><kbd>down arrow</kbd> move focus to next time</li>
          <li><kbd>up arrow</kbd> move focus to previous time</li>

          <li><kbd>home</kbd> move focus to first time</li>
          <li><kbd>end</kbd> move focus to last time</li>

          <li><kbd>enter</kbd> select focused item</li>
          <li><kbd>any key</kbd> search list for time starting with key</li>
        </ul>
      </section>
    );
  }

});

module.exports = DateTimePicker;