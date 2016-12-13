'use strict';
var React = require('react');


var MigrationGuide = React.createClass({

	render: function() {
		return (
			<section {...this.props}>
        <h1 className="page-header">Migrating to 2.0</h1>
        <p>
          Migration should be a relatively painless and easy process. The largest underlying reason for the major bump is 
          the inability to adequately support React <b>0.12</b> along side previous versions. We do, however, take the
          opportunity of a major bump to remove some warts from the widget api and architecture. 
          Most changes are consmetic and easily "grep-able", but should lead to less confusion and increase ease of use. 
          Almost every change can be migrated to via "find and replace".
        </p>
        <p>
          For those unwilling or unable to upgrade, the 1+ branch will continue to be supported for any applicable bug fixes. 
          New features, however, will mostly likely only be added to the 2.0 branch.
        </p>

        <h4>Supported versions of React</h4>
        <p>
          React-widgets now requires React 0.12+ 
        </p>

        <h4>Required polyfills</h4>
        <p>
          Completing the movement away from utility library dependence, we have removed the last few handrolled es5 methods 
           from the code base. This means that in addition to the polyfills required by React, for old browsers, React-widgets 
           now requires a few more. You can use the 
           excellent <a href="https://github.com/es-shims/es5-shim">kriskowal's es5-shim</a> for all of these.
        </p>
        <ul>
          <li><code>Array.prototype.some</code></li>
          <li><code>Array.prototype.filter</code></li>
          <li><code>Array.prototype.reduce</code></li>
        </ul>

        <h4>Exported Values</h4>
        <p>
          We have tried to make the consumption of react-widgets as consistent as possible, regardless of whether you require 
          the entire suite, or just make use of a few widgets. To that end, names and locations of files have been changed to  
          make everything consistent. one of the biggest changes is that the <code>Select</code> widget has changed names
          to <code>Multiselect</code> which is more descriptive, and makes room for the new <code>SelectList</code> widget.
        </p>
        <ul>
          <li><code>require('react-widgets').DropDownlist</code> -> <code>require('react-widgets').DropdownList</code></li>
          <li><code>require('react-widgets').Select</code> -> <code>require('react-widgets').Multiselect</code></li>
        </ul>
        <h4>File Names and Locations</h4>
        <p>
          File names and locations have also changed. Components now all have a consistent PascalCase names that match 
          their exported value. 
          To make it easier to require individual widgets all file structures for components have been flattened down 
          to just the <code>lib/</code> directory.
        </p>
        <ul>
          <li><code>react-widgets/lib/select/select</code> -> <code>react-widgets/lib/Multiselect</code></li>
          <li><code>react-widgets/lib/calendar/calendar</code> -> <code>react-widgets/lib/Calendar</code></li>
          <li><code>react-widgets/lib/pickers/datepicker</code> -> <code>react-widgets/lib/DateTimePicker</code></li>

          <li><code>react-widgets/lib/pickers/numberpicker</code> -> <code>react-widgets/lib/NumberPicker</code></li>
          <li><code>react-widgets/lib/dropdowns/dropdown-list</code> -> <code>react-widgets/lib/DropdownList</code></li>
          <li><code>react-widgets/lib/dropdowns/combobox</code> -> <code>react-widgets/lib/Combobox</code></li>
        </ul>

        <h4>CSS Classes</h4>
        <p>
          For consumers who have made styling additions and changes outside of just altering LESS variables, a few 
          css classes have also changed to match the naming changes in the files and widgets.
        </p>
        <ul>
          <li><code>rw-dropdown-list</code> -> <code>rw-dropdownlist</code></li>
          <li><code>rw-number-picker</code> -> <code>rw-numberpicker</code></li>
          <li><code>rw-date-picker</code> -> <code>rw-datetimepicker</code></li>

          <li><code>rw-select-list</code> -> <code>rw-multiselect</code></li>
          <li><code>rw-select-wrapper</code> -> <code>rw-multiselect-wrapper</code></li>
          <li><code>rw-tag-list</code> -> <code>rw-multiselect-taglist</code></li>
        </ul>
      </section>
		);
	}

});
  
  module.exports = MigrationGuide;