'use strict';
/*global it, describe */

require('babel-core/register')()

var assert = require('assert')
var React = require('react');
var renderToString = require('react-dom/server').renderToString

require('../test-localizer')()

var components = [
  'Calendar',
  'Combobox',
  'DateTimePicker',
  'DropdownList',
  'Multiselect',
  'SelectList',
  'List',
  'NumberPicker'
];

describe('Render to string', function() {
  this.timeout(5000)

  components.forEach(function(file){

    it('should render: ' + file, function(){
      var Type = require('../../src/' + file)

      assert.doesNotThrow(function(){
        var comp = renderToString(React.createElement(Type));

        assert.ok(typeof comp === 'string')
      })

    }.bind(null, file))

  })

  it('should render: Popup', function(){
    var Type = require('../../src/Popup')

    assert.doesNotThrow(function(){
      var comp = renderToString(
        React.createElement(Type, null,
          React.createElement('div')
        )
      )

      assert.ok(typeof comp === 'string')
    })
  })
});
