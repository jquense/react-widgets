require('../vendor/phantomjs-shim')

var React = require('react/addons');
var List = require('../src/common/list.jsx')
  , _ = require('lodash');

//console.log(sinon)
var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findAllTag = TestUtils.scryRenderedDOMComponentsWithTag
  , findAllClass = TestUtils.scryRenderedDOMComponentsWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , findAllType = TestUtils.scryRenderedComponentWithType
  , trigger = TestUtils.Simulate;

describe('List', function(){
  var data = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 }
  ];

  it('should set initial values', function(){
    var list = render(
          <List data={data} onChange={_.noop} />);

    expect( findClass(list, 'rw-list').getDOMNode().children.length).to.be(3);
  })

  it('should respect textField and valueFields', function(){
    var list = render(
          <List data={data} textField='label' valueField='id' />);

    expect(findClass(list, 'rw-list').getDOMNode().children[0].textContent)
      .to.be('jimmy');
  }) 

  it('should use a Item template', function(){
    var templ  = React.createClass({
      render: function() {
        return (<span>{"hello - " + this.props.item}</span>);
      }
    });
    
    var list = render(<List value={'jimmy'} valueComponent={templ} />);

    expect( findClass(list, 'rw-input').getDOMNode().textContent).to.be('hello - jimmy');
  })

})