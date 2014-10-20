/**
 * @jsx React.DOM
 */

var React = require('react')
  , Example = require('../example.jsx')
  , MenuItem = require('react-bootstrap/MenuItem')
  , DDButton = require('react-bootstrap/DropdownButton')
  , ComboBoxExample = require('../examples/combobox.jsx');

var prefix = 'combobox/'
var ComboBox = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">
          Combobox
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem href={'#' + prefix + 'value'}>value</MenuItem>
              <MenuItem href={'#' + prefix + 'onChange'}>onChange</MenuItem>
              <MenuItem href={'#' + prefix + 'data'}>data</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'valueField'}>valueField</MenuItem>
              <MenuItem href={'#' + prefix + 'textField'}>textField</MenuItem>
              <MenuItem href={'#' + prefix + 'itemComponent'}>itemComponent</MenuItem>
              <MenuItem href={'#' + prefix + 'suggest'}>suggest</MenuItem>
              <MenuItem href={'#' + prefix + 'filter'}>filter</MenuItem>

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
          Select an item from the list, or input a custom value. The combobox can also make suggestions as you type
        </p>
        <ComboBoxExample/>
        <Example code={
          "render: function(){\n"+
          "  var Combobox = require('react-widgets').Combobox\n"+
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
        <h3 className='prop-header' id={ prefix +"value" }>
          value <small>mixed</small></h3>
        <p>
          The current value of the Combobox. This can be an object (such as a member of the <code>data</code> array)
          or a primitive value, hinted to by the <code>valueField</code>. The widget value does not need to be in
          the <code>data</code>, widgets can have values that are not in their list.
        </p>

        <h3 className='prop-header' id={ prefix +"onChange" }>
          onChange <small>{"function ( value )"}</small></h3>
        <p>
          change event Handler that is called when the value is changed. If the value is on of
          the <code>data</code> members that item will be returned. In the case of a value not being found in
          the <code>data</code> array the string value of the combobox will be returned.
        </p>

        <h3 className='prop-header' id={ prefix +"data" }>
          data <small>Array - mixed</small></h3>
        <p>
          provide an array of possible values for the combobox. If an array of <code>objects</code> is provided you
          should use  the <code>valueField</code> and <code>textField</code> props, to specify which object
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
          This prop determines which data item field to display in the dropdown list and the text value of combobox.
          This prop is unnecessary when an <code>itemComponent</code> is provided.
        </p>

        <h3 className='prop-header' id={ prefix +"itemComponent" }>
          itemComponent <small>Component</small></h3>
        <p>
          This component is used to render each possible item in the dropdownlist. The default component
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>

        <h3 className='prop-header' id={ prefix +"suggest" }>
          suggest <small>Boolean</small></h3>
        <p>
          When <code>true</code> the Combobox will suggest, or fill in, values as you type. The suggestions
          are always "startsWith", meaning it will search from the start of the <code>textField</code> property
        </p>

        <h3 className='prop-header' id={ prefix +"filter" }>

          filter <small>{'Mixed - false, "startsWith", "endsWith", "contains", function(item)'}</small>
          <span className='default'>false</span>
        </h3>
        <p>
          When <code>true</code> the Combobox will filter the list of values as you type, values as you type. You can use
           a built in filter ("startsWith", "endsWith", "contains"), or specify a {'function'} that returns will be passed
           each item, and should return <code>true</code> for matches.
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
        <h2 id={ prefix +"keyboard" }>Keyboard Navigation</h2>

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