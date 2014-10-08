/**
 * @jsx React.DOM
 */

var React = require('react')
  , Example = require('../example.jsx')
  , DDButton = require('react-bootstrap/DropdownButton')
  , MenuItem = require('react-bootstrap/MenuItem')
  , SelectExample = require('../examples/select.jsx');

var prefix = 'select-list/';

var Select = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">
          Select
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem href={'#' + prefix + 'value'}>value</MenuItem>
              <MenuItem href={'#' + prefix + 'onChange'}>onChange</MenuItem>
              <MenuItem href={'#' + prefix + 'data'}>data</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'valueField'}>valueField</MenuItem>
              <MenuItem href={'#' + prefix + 'textField'}>textField</MenuItem>
              <MenuItem href={'#' + prefix + 'tagComponent'}>tagComponent</MenuItem>
              <MenuItem href={'#' + prefix + 'itemComponent'}>itemComponent</MenuItem>
              <MenuItem href={'#' + prefix + 'placeholder'}>placeholder</MenuItem>

              <MenuItem href={'#' + prefix + 'busy'}>busy</MenuItem>
              <MenuItem href={'#' + prefix + 'duration'}>duration</MenuItem>
              <MenuItem href={'#' + prefix + 'isRtl'}>isRtl</MenuItem>
              <MenuItem href={'#' + prefix + 'messages'}>messages</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'keyboard'}>Keyboard Navigation</MenuItem>
            </DDButton>
          </span>
        </h1>
        <p>
          Multiple selection widget.
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
        <h3 className='prop-header' id={ prefix +"value" }>
          value <small>Array - mixed</small></h3>
        <p>
          The current values of the Select. The value should can <code>null</code>, or an array 
          of <code>valieField</code> values, or an array of objects (such as a few items in the <code>data</code> array) 
        </p>

        <h3 className='prop-header' id={ prefix +"onChange" }>
          onChange <small>{'function ( selectedValue )'}</small></h3>
        <p>
          change event Handler that is called when the value is changed. The handler will return an array of values
        </p>
        <strong>Note:</strong><span> Just like input tags, if you do not specify an <code>onChange</code> handler the widget 
        becomes readonly</span>

        <h3 className='prop-header' id={ prefix +"data" }>
          data <small>Array - mixed</small></h3>
        <p>
          provide an array of possible values for the select. If an array of <code>objects</code> is provided you 
          should use the <code>valueField</code> and <code>textField</code> props, to specify which object 
          properties comprise the value field (such as an id) and the field used to label the item.
        </p>

        <h3 className='prop-header' id={ prefix +"valueField" }>
          valueField <small>String</small></h3>
        <p>
          A property name of a uniquely identifying field in the <code>data</code> array. If no valueField is provided, 
          the widget will use strict equality checks to locate the data item, if it exists.
        </p>

        <h3 className='prop-header' id={ prefix +"textField" }>
          textField <small>String</small></h3>
        <p>
          This prop determines which data item field to display in the select list and selected item This prop is 
          unnecessary when an <code>itemComponent</code> and <code>tagComponent</code> are provided.
        </p>

        <h3 className='prop-header' id={ prefix +"tagComponent" }>
          tagComponent <small>Component</small></h3>
        <p>
          This component is used to render each selected item. The default component 
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>

        <h3 className='prop-header' id={ prefix +"itemComponent" }>
          itemComponent <small>Component</small></h3>
        <p>
          This component is used to render each possible item in the list. The default component 
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>

        <h3 className='prop-header' id={ prefix +"placeholder" }>
          placeholder <small>String</small></h3>
        <p>
          The same as an input placeholder, only works in browsers that support the placeholder attribute for inputs
        </p>

        <h3 className='prop-header' id={ prefix +"busy" }>
          busy <small>Boolean</small></h3>
        <p>
          mark whether the widget is in a busy or loading state. If <code>true</code> the widget will display a spinner gif, useful 
          when loading data via an ajax call.
        </p>
        <h3 className='prop-header' id={ prefix +"duration" }>
          duration <small>Number</small> <span className='default'>250</span></h3>
        <p>
          The speed, in milliseconds, of the dropdown animation.
        </p>
        <h3 className='prop-header' id={ prefix +"duration" }>
          disabled <small>Mixed - Boolean, Array</small></h3>
        <p>
          Disable the widget, If an <code>Array</code> of values is passed in only the tags specified will be disabled.
        </p>

        <h3 className='prop-header' id={ prefix +"duration" }>
          readOnly <small>Mixed - Boolean, Array</small></h3>
        <p>
          Place the widget in a readonly mode, If an <code>Array</code> of values is passed in only the tags specified will be readonly.
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

        <h3>messages.emptyList <small>String</small><span className='default'>"There are no items in this list"</span></h3>
        <p>
          text to display when the <code>data</code> prop array is empty
        </p>
        <h3>messages.emptyFilter <small>String</small><span className='default'>"The filter returned no results"</span></h3>
        <p>
          text to display when the the current filter does not return any results
        </p>

        <h2 id={ prefix +"keyboard" }>Keyboard Navigation</h2>

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