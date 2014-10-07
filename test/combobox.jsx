require('../vendor/phantomjs-shim')

var React = require('react/addons');
var ComboBox = require('../src/dropdowns/combobox.jsx')
  , _ = require('lodash');


var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findAllTag = TestUtils.scryRenderedDOMComponentsWithTag
  , findAllClass = TestUtils.scryRenderedDOMComponentsWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , findAllType = TestUtils.scryRenderedComponentWithType
  , trigger = TestUtils.Simulate;

describe('ComboBox', function(){
  var dataList = [
        { label: 'jimmy', id: 0 },
        { label: 'sally', id: 1 },
        { label: 'pat', id: 2 }
      ];

  it('should set initial values', function(){
    var dropdown = render(
          <ComboBox value={'hello'} onChange={_.noop} />);


    expect( findClass(dropdown, 'rw-input').getDOMNode().value).to.be('hello');
  })

  it('should respect textField and valueFields', function(){
    var comboBox = render(<ComboBox value={0} data={dataList} textField='label' valueField='id' />);
    
    expect(findClass(comboBox, 'rw-input').getDOMNode().value)
      .to.be('jimmy');
  }) 

  it('should start closed', function(done){
    var comboBox = render(<ComboBox value={0} data={dataList} textField='label' valueField='id' />)
      , input = findClass(comboBox, 'rw-input').getDOMNode()
      , popup = findType(comboBox, require('../src/popup/popup.jsx'));


    expect(comboBox.state.open).to.be(false)
    expect(comboBox.getDOMNode().className).to.not.match(/\brw-open\b/)
    expect(input.getAttribute('aria-expanded')).to.be('false')
  
    setTimeout(function(){
      expect(popup.getDOMNode().style.display).to.be('none')
      done()
    }, 0)
  })

  it('should open when clicked', function(done){
    var comboBox = render(<ComboBox value={'jimmy'} data={dataList} duration={0}/>)
      , input = findClass(comboBox, 'rw-input').getDOMNode()
      , popup = findType(comboBox, require('../src/popup/popup.jsx'))

    trigger.click(findClass(comboBox, 'rw-select').getDOMNode())

    setTimeout(function() {
      expect(comboBox.state.open).to.be(true)
      expect(comboBox.getDOMNode().className).to.match(/\brw-open\b/)
      expect(input.getAttribute('aria-expanded')).to.be('true')
      expect(popup.props.open).to.be(true)
      done()
    }, 1000) 
  })

  it('should do nothing when disabled', function(done){
    var comboBox = render(<ComboBox value={'jimmy'} data={dataList} duration={0} disabled={true}/>)
      , input = findClass(comboBox, 'rw-input').getDOMNode();

    expect( input.hasAttribute('disabled')).to.be(true);
    expect( input.getAttribute('disabled')).to.be('');

    trigger.click(findTag(comboBox, 'button').getDOMNode())

    setTimeout(function() {
      expect(comboBox.state.open).to.be(false)
      done()
    }, 0) 
  })

  it('should do nothing when readonly', function(done){
    var comboBox = render(<ComboBox value={'jimmy'} data={dataList} duration={0} readOnly={true}/>)
      , input = findClass(comboBox, 'rw-input').getDOMNode();

    expect( input.hasAttribute('readonly')).to.be(true);
    expect( input.getAttribute('readonly')).to.be('');

    trigger.click(findTag(comboBox, 'button').getDOMNode())

    setTimeout(function() {
      expect(comboBox.state.open).to.be(false)
      done()
    }, 0)
  })

  it('should change values on key down', function(){
    var change = sinon.spy()
      , comboBox = render(<ComboBox value={dataList[1]} data={dataList} duration={0} onChange={change}/>);

    trigger.keyDown(comboBox.getDOMNode(), { key: 'ArrowDown'})

    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(dataList[2])).to.be(true)

    comboBox = render(<ComboBox value={dataList[1]} data={dataList} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(comboBox.getDOMNode(), { key: 'ArrowUp'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(dataList[0])).to.be(true)

    comboBox = render(<ComboBox value={dataList[1]} data={dataList} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(comboBox.getDOMNode(), { key: 'Home'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(dataList[0])).to.be(true)

    comboBox = render(<ComboBox value={dataList[1]} data={dataList} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(comboBox.getDOMNode(), { key: 'End'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(dataList[2])).to.be(true)
  })

})