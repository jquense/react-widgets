/**
 * @jsx React.DOM
 */

var React = require('react')
  , Example = require('../example.jsx')
  , MenuItem = require('react-bootstrap/MenuItem')
  , DDButton = require('react-bootstrap/DropdownButton')
  , DropdownListExample = require('../examples/dropdownlist.jsx');

var prefix = 'dropdown-list/'
var DropdownList = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">
          Dropdown List
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem href={'#' + prefix + 'value'}>value</MenuItem>
              <MenuItem href={'#' + prefix + 'onChange'}>onChange</MenuItem>
              <MenuItem href={'#' + prefix + 'data'}>data</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'valueField'}>valueField</MenuItem>
              <MenuItem href={'#' + prefix + 'textField'}>textField</MenuItem>
              <MenuItem href={'#' + prefix + 'valueComponent'}>valueComponent</MenuItem>
              <MenuItem href={'#' + prefix + 'itemComponent'}>itemComponent</MenuItem>

              <MenuItem href={'#' + prefix + 'busy'}>busy</MenuItem>
              <MenuItem href={'#' + prefix + 'duration'}>duration</MenuItem>
              <MenuItem href={'#' + prefix + 'isRtl'}>isRtl</MenuItem>
              <MenuItem href={'#' + prefix + 'messages'}>messages</MenuItem>
            </DDButton>
          </span>
        </h1>
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
        <h3 className='prop-header' id={ prefix +"value" }>
          value <small>mixed</small>
        </h3>
        <p>
          The current value of the DropdownList.
        </p>

        <h3 className='prop-header' id={ prefix +"onChange" }>
          onChange <small>{"function ( selectedValue )"}</small></h3>
        <p>
          change event Handler that is called when the value is changed. 
        </p>
        <strong>Note:</strong><span> Just like input tags, if you do not specify an <code>onChange</code> handler the widget 
        becomes readonly</span>

        <h3 className='prop-header' id={ prefix +"data" }>
          data <small>Array - mixed</small></h3>
        <p>
          provide an array of possible values for the dropdown list. If an array of <code>objects</code> is provided you should use 
          the <code>valueField</code> and <code>textField</code> props, to specify an array item unique id and label respectively
        </p>
        <h3 className='prop-header' id={ prefix +"valueField" }>
          valueField <small>String</small></h3>
        <p>
          The field name of a uniquely identifying field in the <code>data</code> array
        </p>
        <h3 className='prop-header' id={ prefix +"textField" }>
          textField <small>String</small></h3>
        <p>
          This prop determines which data item field to display in the combobox and selected item. This prop is 
          unnecessary when a <code>itemComponent</code> is provided
        </p>

        <h3 className='prop-header' id={ prefix +"valueComponent" }>
          valueComponent <small>Component</small></h3>
        <p>
          This component is used to render the selected value of the combobox. The default component 
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>

        <h3 className='prop-header' id={ prefix +"itemComponent" }>
          itemComponent <small>Component</small></h3>
        <p>
          This component is used to render each possible item in the dropdownlist. The default component 
          renders the text of the selected item (specified by <code>textfield</code>)
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
        <h3>messages.open <small>String</small> <span className='default'>"Open Dropdown"</span></h3>
        <p>
          Dropdown button text for screen readers
        </p>

        <h2>
          <a href={ prefix +"keyboard" }><i className="fa fa-link"></i></a>
          Keyboard Navigation</h2>

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

module.exports = DropdownList;