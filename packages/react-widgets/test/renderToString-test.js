/**
 * @jest-environment node
 */

const React = require('react');
const renderToString = require('react-dom/server').renderToString

const components = [
  'Calendar',
  'Combobox',
  'DateTimePicker',
  'DropdownList',
  'Multiselect',
  'SelectList',
  'List',
  'NumberPicker'
];

describe('Render to string', () => {
  afterEach(() => {
    console.error.restore()
  })

  components.forEach(function(file){
    it('should render: ' + file, function(){
      const Type = require('../src/' + file)

      expect(function(){
        const comp = renderToString(React.createElement(Type));

        expect(typeof comp === 'string').to.equal(true)
      }).to.not.throw()

    }.bind(null, file))
  })

  it('should render: Popup', function(){
    const Type = require('../src/Popup')

    expect(function(){
      const comp = renderToString(
        React.createElement(Type, null,
          React.createElement('div')
        )
      )

      expect(typeof comp === 'string').to.equal(true)
    }).to.not.throw()
  })
});
