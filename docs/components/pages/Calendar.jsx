/**
 * @jsx React.DOM
 */

var React = require('react')
  , Example = require('../example.jsx')
  , CalendarExample = require('../examples/calendar.jsx');

var Calendar = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">Calendar</h1>
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
        <h3>value <small>Date</small></h3>
        <p>
          The current selected date, should be a JavaScript Date instance.
        </p>

        <h3>onChange <small>{'function ( selectedValue )'}</small></h3>
        <p>
          change event Handler that is called when the value is changed. 
        </p>
        <strong>Note:</strong><span> Just like input tags, if you do not specify an <code>onChange</code> handler the widget 
        becomes readonly</span>

        <h3>min <small>Date</small></h3>
        <p>
          The minimum Date that the Calendar can navigate into the past
        </p>

        <h3>max <small>Date</small></h3>
        <p>
          The maximum date that the Calendar can navigate into the future
        </p>

        <h3>
          initialView <small>One of - "month", "year", "decade", "century"</small>
          <span className='default'>"month"</span>
        </h3>
        <p>
          The starting and lowest level view the calendar can navigate down to.
        </p>

        <h3>
          finalView <small>One of - "month", "year", "decade", "century"</small>
          <span className='default'>"century"</span>
        </h3>
        <p>
          The highest level view the calendar can navigate up to; Should be higher then <code>initialView</code>
        </p>

        
        <h3>isRtl <small>Boolean</small></h3>
        <p>
          mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
           a <code>childContext</code> prop (<code>isRtl</code>) this allows higher level application components to specify the direction.
        </p>

        <h3>messages <small>Object</small></h3>
        <p>
          Object hash containing display text and/or text for screen readers. Use the <code>messages</code> object to 
          localize widget text and increase accessibility.
        </p>
        <h3>messages.moveBack <small>String</small><span className='default'>"navigate back"</span></h3>
        <p>
          title and screen reader text for the left arrow button
        </p>
        <h3>messages.moveForward <small>String</small><span className='default'>"navigate forward"</span></h3>
        <p>
          title and screen reader text for the right arrow button
        </p>

        <h2>Keyboard Navigation</h2>

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