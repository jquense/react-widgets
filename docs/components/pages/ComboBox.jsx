/**
 * @jsx React.DOM
 */

var React = require('react')
  , Example = require('../example.jsx')
  , ComboBoxExample = require('../examples/combobox.jsx');

var ComboBox = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">Combobox</h1>
        <p>
          Select an item from the list, or input a custom value. The combobox can also make suggestions as you type
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

        <h3>onChange <small>{"function ( selectedValue )"}</small></h3>
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
          filter <small>{'Mixed - false, "startsWith", "endsWith", "contains", function(a, b)'}</small>
          <span className='default'>false</span>
        </h3>
        <p>
          When <code>true</code> the Combobox will filter the list of values as you type, values as you type. The suggestions 
          are always "startsWith", meaning it will search from the start of the <code>textField</code> property
        </p>

        <h3>busy <small>Boolean</small></h3>
        <p>
          mark whether the widget is in a busy or loading state. If <code>true</code> the widget will display a spinner gif, useful 
          when loading data via an ajax call.
        </p>
        <h3>duration <small>Number</small> <span className='default'>250</span></h3>
        <p>
          The speed, in milliseconds, of the dropdown animation.
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
    );
  }

});

module.exports = ComboBox;