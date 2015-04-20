'use strict';
var React = require('react')
  , EditableExample = require('../EditableExample')
  , DDButton = require('../../bootstrap').DropdownButton
  , MenuItem = require('../ApiMenuItem.jsx')
  , PropHeader = require('../PropHeader.jsx')
  , DatePickerExample = require('../demos/datepicker.jsx');

var prefix = 'datetime-picker/'
var widgetName = 'DateTimePicker'
var DateTimePicker = React.createClass({

  mixins: [ require('../PageMixin')(prefix) ],
  
  render: function() {
    return (
      <section {...this.props}>
        <h1 className="page-header">
          Date and Time Picker
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem>value</MenuItem>
              <MenuItem>onChange</MenuItem>
              <MenuItem>data</MenuItem>
              <MenuItem divider/>
              <MenuItem>calendar</MenuItem>
              <MenuItem>time</MenuItem>
              <MenuItem>min</MenuItem>
              <MenuItem>max</MenuItem>
              <MenuItem>step</MenuItem>
              <MenuItem>format</MenuItem>
              
              <MenuItem>parse</MenuItem>
              <MenuItem>initialView</MenuItem>
              <MenuItem>finalView</MenuItem>

              <MenuItem>open</MenuItem>
              <MenuItem>onToggle</MenuItem>

              <MenuItem>duration</MenuItem>
              <MenuItem>isRtl</MenuItem>
              <MenuItem>messages</MenuItem>
              <MenuItem divider/>
              <MenuItem>Keyboard Navigation</MenuItem>
            </DDButton>
          </span>
        </h1>
        <p>
          Manipulate different parts of a JavaScript <code>Date</code> object with ease. Date formats
          are <em>highly</em> localized, and localization is hard, rather than provide a half baked solution 
          react-widgets includes a default strategy for that via <a target='_blank' href="https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468">Globalize.js</a>. 
          You can pass in a <code>culture</code> string to the widgets, but you are responsible for loading the globalize culture file yourself. 
          You can also completely replace globalize by providing format and parsing props.
        </p>
        <p>
          {`Dates are never mutated but always return and operate on a new Date instance. When the `}<code>date</code>{` prop
          is used the ${widgetName} will pass through the relevant props to the Calendar Widget and Calendar keyboard navigation keys will also work.`} 
        </p>
        <pre className='component-export'>
          <code>
          <div>Widget Suite:</div>
          {` ${widgetName}`} = require(<span className='str'>'react-widgets'</span>){`.${widgetName}`}<br/>
          <div>Individual Component:</div>
          {` ${widgetName}`} = require(<span className='str'>{`'react-widgets/lib/${widgetName}'`}</span>)
          </code>
        </pre>
        <DatePickerExample/>
       
        <h2>Props</h2>
        <PropHeader type='Date?' handler="onChange" controllable>value</PropHeader>
        <p>
          The current selected date, should be a <code>Date</code> instance or <code>null</code>.
        </p>
        <EditableExample codeText={require('../examples/valuePicker')(widgetName, ['new Date()', null])}/>

        <PropHeader type='Function(Date? date, String dateStr)'>onChange</PropHeader>
        <p>
          change event Handler that is called when the value is changed. The handler is called with both the
          current <code>Date</code> object (or null if it was not parseable), and the second argument is
          a <code>string</code> representation of the date value, formated by the <code>format</code> prop.
        </p>
        <EditableExample codeText={require('../examples/onChangePicker')(widgetName, ['new Date()', null])}/>

        <PropHeader type='Function(Date? value)'>onSelect</PropHeader>
        <p>
          This handler fires when an item has been selected from the list or calendar. It fires before the <code>onChange</code> handler, and fires 
          regardless of whether the value has actually changed.
        </p>
        <EditableExample codeText={require('../examples/onSelectPicker')(widgetName)}/>

        <PropHeader type='Boolean' default='true'>calendar</PropHeader>
        <p>
          Whether to show the date picker button.
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, 'calendar', false)}/>

        <PropHeader type='Boolean' default='true'>time</PropHeader>
        <p>
          Whether to show the time picker button.
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, 'time', false)}/>

        <PropHeader type='Date' default='Date(1900, 0, 1)'>min</PropHeader>
        <p>
          The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
          can be typed or pasted into the widget. If you need this behavior you can constrain values via
          the <code>onChange</code> handler.
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, 'min', 'new Date()')}/>

        <PropHeader type='Date' default='Date(2099, 11, 31)'>max</PropHeader>
        <p>
          The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
          can be typed or pasted into the widget. If you need this behavior you can constrain values via
          the <code>onChange</code> handler.
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, 'max', 'new Date()')}/>

        <PropHeader type='String' default='"f|d|t"'>format</PropHeader>
        <p>
          A string format used to display the date value. For more information on prefined and custom formats
          visit the <a href='https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468#dates'>
            Globalize.js documentation <i className="fa fa-external-link"></i>
          </a>
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, 'format', '"MMM dd yyyy"')}/>

        <PropHeader type='Number' default="false">step</PropHeader>
        <p>
          The amount of minutes between each entry in the time list.
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, { step: 90 })}/>

        <PropHeader type='[Function(String str), Array<String>]'>parse</PropHeader>
        <p>
          Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try,
          or provide a {'function'} that returns a date to handle parsing yourself. When <code>parse</code> is unspecified and 
          the <code>format</code> prop is a <code>String</code> parse will automatically use that format as its default
        </p>
        <EditableExample codeText={require('../examples/parse')(widgetName)}/>

        <PropHeader type='Enum' default='"month"'>initialView</PropHeader>
        <p>
          The starting and lowest level view the calendar can navigate down to.
        </p>
        <p>
          Acceptable values are:
          <code>"month"</code> <code>"year"</code> <code>"decade"</code> <code>"century"</code>
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, 'initialView', '"year"')}/>

        <PropHeader type='Enum' default='"century"'>finalView</PropHeader>
        <p>
          The highest level view the calendar can navigate up to. This value should be higher
          than <code>initialView</code>
        </p>
        <p>
          Acceptable values are:
          <code>"month"</code> <code>"year"</code> <code>"decade"</code> <code>"century"</code>
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, 'finalView', '"year"')}/>

        <PropHeader type='[Boolean, String]' default='false' controllable handler='onToggle'>open</PropHeader>
        <p>
          Whether or not the {widgetName} is open. When unset (<code>undefined</code>) the {widgetName} will handle the
          opening and closing internally. The <code>defaultOpen</code> prop can be used to {'set'} an
          initialization value for uncontrolled widgets.
        </p>
        <p>
          Acceptable values are: <code>false</code> <code>"calendar"</code> <code>"time"</code>
        </p>
        <EditableExample codeText={require('../examples/openDateTime')(widgetName)}/>

        <PropHeader type='Function(Boolean isOpen)'>onToggle</PropHeader>
        <p>
          Called when the {widgetName} is about to open or close. <code>onToggle</code> should be used
          when the <code>open</code> prop is {'set'} otherwise the widget will never open or close.
        </p>

        <PropHeader type='Number' default="250">duration</PropHeader>
        <p>
          The speed, in milliseconds, of the either dropdown animation.
        </p>
        <PropHeader type='Boolean' default="false">isRtl</PropHeader>
        <p>
          mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
           a <code>childContext</code> prop (<code>isRtl</code>) this allows higher level application components to specify the direction.
        </p>

        <PropHeader type='Object'>messages</PropHeader>
        <p>
          Object hash containing display text and/or text for screen readers. Use the <code>messages</code> object to
          localize widget text and increase accessibility.
        </p>

        <PropHeader type='String' default='"Select Date"'>messages.calendarButton</PropHeader>
        <p>
          title and screen reader text for the left arrow button
        </p>

        <PropHeader type='String' default='"Select Time"'>messages.timeButton</PropHeader>
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