require('../vendor/phantomjs-shim')

var React = require('react/addons');
var Dropdown = require('../src/dropdowns/dropdown-list.jsx')
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

describe('DROPDOWNS', function(){
  var data = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 }
  ];

  it('should set initial values', function(){
    var dropdown = render(
          <Dropdown value={'hello'} onChange={_.noop} />);

    expect( findClass(dropdown, 'rw-input').getDOMNode().textContent).to.be('hello');
  })

  it('should respect textField and valueFields', function(){
    var dropdown = render(
          <Dropdown value={0} data={data} textField='label' valueField='id' />);

    expect(findClass(dropdown, 'rw-input').getDOMNode().textContent)
      .to.be('jimmy');
  }) 

  it('should start closed', function(done){
    var dropdown = render(
          <Dropdown value={0} data={data} textField='label' valueField='id' />);

    expect(dropdown.state.open).to.be(false)
    expect(dropdown.getDOMNode().className).to.not.match(/\brw-open\b/)
    expect(dropdown.getDOMNode().getAttribute('aria-expanded')).to.be('false')
  
    setTimeout(function(){
      expect(popup.getDOMNode().style.display).to.be('none')
      done()
    }, 0)
  })

  it('should use a value template', function(){
    var templ  = React.createClass({
      render: function() {
        return (<span>{"hello - " + this.props.item}</span>);
      }
    });
    
    var dropdown = render(<Dropdown value={'jimmy'} valueComponent={templ} />);

    expect( findClass(dropdown, 'rw-input').getDOMNode().textContent).to.be('hello - jimmy');
  })

  it.only('should open when clicked', function(done){
    var dropdown = render(<Dropdown value={'jimmy'} data={data} duration={0}/>);
    var popup = findType(dropdown, require('../src/popup/popup.jsx'))

    trigger.click(dropdown.getDOMNode())

    setTimeout(function() {
      expect(dropdown.state.open).to.be(true)
      expect(dropdown.getDOMNode().className).to.match(/\brw-open\b/)
      expect(dropdown.getDOMNode().getAttribute('aria-expanded')).to.be('true')
      expect(popup.props.open).to.be(true)
      done()
    }, 0) 
  })


  it.only('should change values on key down', function(){
    var change = sinon.spy()
      , dropdown = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>);

    trigger.keyDown(dropdown.getDOMNode(), { key: 'ArrowDown'})

    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[2])).to.be(true)

    dropdown = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(dropdown.getDOMNode(), { key: 'ArrowUp'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[0])).to.be(true)

    dropdown = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(dropdown.getDOMNode(), { key: 'Home'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[0])).to.be(true)

    dropdown = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(dropdown.getDOMNode(), { key: 'End'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[2])).to.be(true)
  })

})