/**
 * @jsx React.DOM
 */

var React = require('react')
  , Example = require('../example.jsx')
  , SelectExample = require('../examples/select.jsx');

var Select = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">Select</h1>
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

        <h3>onChange <small>{'function ( selectedValue )'}</small></h3>
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
    );
  }

});

module.exports = Select;