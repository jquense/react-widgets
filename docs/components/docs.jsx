var React = require('react/addons')
  , Bootstrap = require('react-bootstrap')
  , Navbar = require('./topnavbar.jsx')
  , Example = require('./example.jsx')
  , fs = require('fs')
  , _ = require('lodash')

  , DropdownListExample = require('./examples/dropdownlist.jsx')
  , ComboBoxExample = require('./examples/combobox.jsx')
  , SelectExample = require('./examples/select.jsx')
  , CalendarExample = require('./examples/calendar.jsx');

require('../../src/less/react-widgets.less')

var Docs = React.createClass({

  displayName: 'DocPage',

  getInitialState: function () {
    return {
      sideHref: null,
    }
  },

  render: function(){
    var Nav = Bootstrap.Nav
      , NavItem = Bootstrap.NavItem
      , TabPane = Bootstrap.TabPane;

    return (
      <div style={{ marginTop: 72 }}>
        <Navbar page={this.props.page}/>
        <div className='container'>
          <aside className='col-sm-3'>
            <Nav activeHref={this.state.sideHref} onSelect={this.handleNavItemSelect}>
              <NavItem key={0} href='#intro'>Getting Started</NavItem>
              <NavItem key={1} href='#dropdown-list'>Dropdown List</NavItem>
              <NavItem key={2} href='#combobox'>Combobox</NavItem>
              <NavItem key={3} href='#select-list'>Select</NavItem>
              <NavItem key={4} href='#calendar'>Calendar</NavItem>
              <NavItem key={5} href='#date-picker'>Date Picker</NavItem>
              <NavItem key={6} href='#number-picker'>Number Picker</NavItem>
            </Nav>
          </aside>
          <article className='col-sm-9'>
            <section>
              <h1 id="intro" className="page-header">Getting Started</h1>
              <p>
                React-widgets offers a basic set UI widgets, based on the excellent Kendo UI Core, and jQuery UI, but created from stratch as true 
                React components, rather then as wrappers around these libraries. These widgets are 'pure' compared to their non-react counterparts, and 
                manage far less state and data internally. Since data flows best in React from the top down, each widget does not make attempt to fetch their data 
                but expects it to be passed in via <code>props</code>. Practically this means that ajax calls for data need to handled by some mechanism outside the widget.
              </p>
              <p>
                Once you have the data, each widget follows a simple <code>value=x</code> and <code>onChange</code> interface in the same 
                way normal <code>{'<input/>'}</code> tags do. For certain Widgets (dropdown list, combobox, select) there is an 
                additional <code>data</code> prop that is an array of possible values
              </p>
            </section>
            <section>
              <h1 id="dropdown-list" className="page-header">Dropdown List</h1>
              <p>
                A <code>{'<select/>'}</code> tag replacement that offers additional functionality. the Dropdown list
              </p>
              <div className='example'>
                <DropdownListExample/>
              </div>
              <Example code={
                "render: function(){\n"+
                "  var DropdownList = require('react-widgets').DropdownList\n"+
                "    , list = [\n"+
                "      { label: 'orange', id: 1 },\n"+
                "      { label: 'blue', id: 2 },\n"+
                "      { label: 'red', id: 3 },\n"+
                "    ]\n"+
                "  return (\n"+
                "    <DropdownList \n"+
                "      data={list}\n"+
                "      value={this.state.value}\n"+
                "      onChange={this._change}\n"+
                "      textField='label'\n"+
                "      valueField='id'/>\n"+
                "  )\n"+
                "},\n\n"+
                "_change: function(value){\n"+
                "  this.setState({\n"+
                "    value: value\n"+
                "  })\n"+
                "}\n"
              }/>

              <h2>Props</h2>
              <h3>value <small>mixed</small></h3>
              <p>
                The current value of the DropdownList.
              </p>

              <h3>onChange <small>function ( selectedValue )</small></h3>
              <p>
                change event Handler that is called when the value is changed. 
              </p>
              <strong>Note:</strong><span> Just like input tags, if you do not specify an <code>onChange</code> handler the widget 
              becomes readonly</span>

              <h3>data <small>Array - mixed</small></h3>
              <p>
                provide an array of possible values for the dropdown list. If an array of <code>objects</code> is provided you should use 
                the <code>valueField</code> and <code>textField</code> props, to specify an array item unique id and label respectively
              </p>
              <h3>valueField <small>String</small></h3>
              <p>
                The field name of a uniquely identifying field in the <code>data</code> array
              </p>
              <h3>textField <small>String</small></h3>
              <p>
                This prop determines which data item field to display in the combobox and selected item. This prop is 
                unnecessary when a <code>itemComponent</code> is provided
              </p>

              <h3>valueComponent <small>Component</small></h3>
              <p>
                This component is used to render the selected value of the combobox. The default component 
                renders the text of the selected item (specified by <code>textfield</code>)
              </p>

              <h3>itemComponent <small>Component</small></h3>
              <p>
                This component is used to render each possible item in the dropdownlist. The default component 
                renders the text of the selected item (specified by <code>textfield</code>)
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
              <h3>messages.open <small>String</small> <span className='default'>"Open Dropdown"</span></h3>
              <p>
                Dropdown button text for screen readers
              </p>

              <h2>Keyboard Navigation</h2>

              <ul className='list-unstyled keyboard-list'>
                <li><kbd>alt + down arrow</kbd> open dropdown</li>
                <li><kbd>alt + up arrow</kbd> close dropdown</li>
                <li><kbd>down arrow</kbd> move focus to next item</li>
                <li><kbd>up arrow</kbd> move focus to previous item</li>

                <li><kbd>home</kbd> move focus to first item</li>
                <li><kbd>end</kbd> move focus to last item</li>

                <li><kbd>enter</kbd> select focused item</li>

                <li><kbd>any key</kbd> search list for item starting with key</li>
              </ul>
            </section>


            <section>
              <h1 id="combobox" className="page-header">Combobox</h1>
              <p>
                Select an item from the list, or input a custom value. The vombobox can also make suggestions as you type
              </p>
              <ComboBoxExample/>
              <Example code={
                "render: function(){\n"+
                "  //... \n\n" +
                "  return (\n"+
                "    <Combobox \n"+
                "      data={list}\n"+
                "      value={this.state.value}\n"+
                "      onChange={this._change}\n"+
                "      textField='label'\n"+
                "      valueField='id'/>\n\n"+
                "    <Combobox \n"+
                "      data={list}\n"+
                "      ...\n"+
                "      suggest={true}\n"+
                "      filter={false}/>\n\n"+
                "    <Combobox \n"+
                "      data={list}\n"+
                "      value={this.state.value}\n"+
                "      ...\n"+
                "      filter={true}/>\n"+
                "  )\n"+
                "}"
              }/>
              <h2>Props</h2>
              <h3>value <small>mixed</small></h3>
              <p>
                The current value of the DropdownList.
              </p>

              <h3>onChange <small>function ( selectedValue )</small></h3>
              <p>
                change event Handler that is called when the value is changed. 
              </p>
              <strong>Note:</strong><span> Just like input tags, if you do not specify an <code>onChange</code> handler the widget 
              becomes readonly</span>

              <h3>data <small>Array - mixed</small></h3>
              <p>
                provide an array of possible values for the dropdown list. If an array of <code>objects</code> is provided you should use 
                the <code>valueField</code> and <code>textField</code> props, to specify an array item unique id and label respectively
              </p>

              <h3>valueField <small>String</small></h3>
              <p>
                The field name of a uniquely identifying field in the <code>data</code> array
              </p>

              <h3>textField <small>String</small></h3>
              <p>
                This prop determines which data item field to display in the dropdown list and selected item This prop is 
                unnecessary when a <code>itemComponent</code> is provided
              </p>

              <h3>itemComponent <small>Component</small></h3>
              <p>
                This component is used to render each possible item in the dropdownlist. The default component 
                renders the text of the selected item (specified by <code>textfield</code>)
              </p>

              <h3>suggest <small>Boolean</small></h3>
              <p>
                When <code>true</code> the Combobox will suggest, or fill in, values as you type. The suggestions 
                are always "startsWith", meaning it will search from the start of the <code>textField</code> property
              </p>

              <h3>
                filter <small>Mixed - false, "startsWith", "endsWith", "contains", function(a, b)</small>
                <span className='default'>false</span>
              </h3>
              <p>
                When <code>true</code> the Combobox will filter the list of values as you type, values as you type. The suggestions 
                are always "startsWith", meaning it will search from the start of the <code>textField</code> property
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
              <h3>messages.open <small>String</small> <span className='default'>"Open Combobox"</span></h3>
              <p>
                Combobox button text for screen readers
              </p>
              <h3>messages.emptyList <small>String</small><span className='default'>"There are no items in this list"</span></h3>
              <p>
                text to display when the <code>data</code> prop array is empty
              </p>
              <h3>messages.emptyFilter <small>String</small><span className='default'>"The filter returned no results"</span></h3>
              <p>
                text to display when the the current filter does not return any results
              </p>
              <h2>Keyboard Navigation</h2>

              <ul className='list-unstyled keyboard-list'>
                <li><kbd>alt + down arrow</kbd> open dropdown</li>
                <li><kbd>alt + up arrow</kbd> close dropdown</li>
                <li><kbd>down arrow</kbd> move focus to next item</li>
                <li><kbd>up arrow</kbd> move focus to previous item</li>

                <li><kbd>home</kbd> move focus to first item</li>
                <li><kbd>end</kbd> move focus to last item</li>

                <li><kbd>enter</kbd> select focused item</li>

                <li><kbd>any key</kbd> search list for item starting with key</li>
              </ul>
            </section>


            <section>
              <h1 id="select-list" className="page-header">Select</h1>
              <p>
                Multiple selection widget. Allow allows for on the fly creation of tags (provided they are handled by the parent component)
              </p>
              <SelectExample/>
              <Example code={
                "render: function(){\n"+
                "  //... \n\n" +
                "  return (\n"+
                "    <Select \n"+
                "      data={list}\n"+
                "      value={this.state.value}\n"+
                "      onChange={this._change}\n"+
                "      textField='label'\n"+
                "      valueField='id'/>\n"+
                "   )\n"+
                "}"
              }/>

              <h2>Props</h2>
              <h3>value <small>Array - mixed</small></h3>
              <p>
                The current values of the Select.
              </p>

              <h3>onChange <small>function ( selectedValue )</small></h3>
              <p>
                change event Handler that is called when the value is changed. 
              </p>
              <strong>Note:</strong><span> Just like input tags, if you do not specify an <code>onChange</code> handler the widget 
              becomes readonly</span>

              <h3>data <small>Array - mixed</small></h3>
              <p>
                provide an array of possible values for the dropdown list. If an array of <code>objects</code> is provided you should use 
                the <code>valueField</code> and <code>textField</code> props, to specify an array item unique id and label respectively
              </p>

              <h3>valueField <small>String</small></h3>
              <p>
                The field name of a uniquely identifying field in the <code>data</code> array
              </p>

              <h3>textField <small>String</small></h3>
              <p>
                This prop determines which data item field to display in the select list and selected item This prop is 
                unnecessary when a <code>itemComponent</code> is provided
              </p>

              <h3>tagComponent <small>Component</small></h3>
              <p>
                This component is used to render each selected item. The default component 
                renders the text of the selected item (specified by <code>textfield</code>)
              </p>

              <h3>itemComponent <small>Component</small></h3>
              <p>
                This component is used to render each possible item in the list. The default component 
                renders the text of the selected item (specified by <code>textfield</code>)
              </p>

              <h3>placeholder <small>String</small></h3>
              <p>
                The same as an input placeholder, only works in browsers that support the placeholder attribute for inputs
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

              <h3>messages.emptyList <small>String</small><span className='default'>"There are no items in this list"</span></h3>
              <p>
                text to display when the <code>data</code> prop array is empty
              </p>
              <h3>messages.emptyFilter <small>String</small><span className='default'>"The filter returned no results"</span></h3>
              <p>
                text to display when the the current filter does not return any results
              </p>

              <h2>Keyboard Navigation</h2>

              <ul className='list-unstyled keyboard-list'>
                <li><kbd>down arrow</kbd> open dropdown, and move focus to next item</li>
                <li><kbd>up arrow</kbd> move focus to previous item</li>
                <li><kbd>alt + up arrow</kbd> close dropdown</li>

                <li><kbd>left arrow</kbd> move focus to previous selected tag</li>
                <li><kbd>right arrow</kbd> move focus to previous selected tag</li>
                <li><kbd>delete</kbd> unselect focused tag</li>
                <li><kbd>backspace</kbd> remove next selected tag</li>

                <li><kbd>home</kbd> move focus to first item</li>
                <li><kbd>end</kbd> move focus to last item</li>

                <li><kbd>enter</kbd> select focused item</li>

                <li><kbd>any key</kbd> search list for item starting with key</li>
              </ul>

            </section>


            <section>
              <h1 id="select-list" className="page-header">Calendar</h1>
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
                "   )\n"+
                "    <Calendar \n"+
                "      ...\n"+
                "      initialView='year'\n"+
                "      finialView='decade'/>\n"+
                "   \n"+
                "}"
              }/>

              <h2>Props</h2>
              <h3>value <small>Date</small></h3>
              <p>
                The current selected date, should be a JavaScript Date instance.
              </p>

              <h3>onChange <small>function ( selectedValue )</small></h3>
              <p>
                change event Handler that is called when the value is changed. 
              </p>
              <strong>Note:</strong><span> Just like input tags, if you do not specify an <code>onChange</code> handler the widget 
              becomes readonly</span>


              <h3>min <small>Date</small></h3>
              <p>
                The minimal Date that the Calendar can navigate into the past
              </p>

              <h3>max <small>Date</small></h3>
              <p>
                The maximal date that the Calendar can navigate into the future
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
          </article>
        </div>
      </div>
    )
  },

  handleNavItemSelect: function (key, href) {
    this.setState({ sideHref: href });
    window.location = href;
  },
})


React.renderComponent(
    Docs()
  , document.body);
