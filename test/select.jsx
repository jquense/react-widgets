require('../vendor/phantomjs-shim')

var React = require('react/addons');
var Select = require('../src/select/select.jsx')
  , TagList = require('../src/select/tag-list.jsx')
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

describe('Select', function(){
  var dataList = [
        { label: 'jimmy', id: 0 },
        { label: 'sally', id: 1 },
        { label: 'pat', id: 2 }
      ];

  it('should set initial values', function(){
    var select = render(<Select value={['hello']} onChange={_.noop} />)
      , tags   = findType(select, TagList).getDOMNode();

    expect( tags.children[0].children[0].textContent).to.be('hello');
  })

  it('should respect textField and valueFields', function(){
    var select = render(<Select value={[0]} data={dataList} textField='label' valueField='id' />)
      , tags   = findType(select, TagList).getDOMNode();

    expect( tags.children[0].children[0].textContent).to.be('jimmy');
  }) 

  it('should start closed', function(done){
    var select = render(<Select value={[0]} data={dataList} textField='label' valueField='id' />);
    var popup = findType(select, require('../src/popup/popup.jsx'));

    expect(select.state.open).to.be(false)
    expect(select.getDOMNode().className).to.not.match(/\brw-open\b/)
    expect(findClass(select, 'rw-input').getDOMNode().getAttribute('aria-expanded')).to.be('false')
  
    setTimeout(function(){
      expect(popup.getDOMNode().style.display).to.be('none')
      done()
    }, 0)
  })

  it('should open when clicked', function(done){
    var select = render(<Select value={['jimmy']} data={dataList} duration={0}/>);
    var popup = findType(select, require('../src/popup/popup.jsx'))

    trigger.click(findClass(select, 'rw-select-wrapper').getDOMNode())

    setTimeout(function() {
      expect(select.state.open).to.be(true)
      expect(select.getDOMNode().className).to.match(/\brw-open\b/)
      expect(findClass(select, 'rw-input').getDOMNode().getAttribute('aria-expanded')).to.be('true')
      expect(popup.props.open).to.be(true)
      done()
    }, 0) 
  })

  it('should remove tag when clicked', function(){
    var del = sinon.spy()
      , tags = render(
          <TagList value={[dataList[0], dataList[1]]} data={dataList} textField='label' valueField='id' onDelete={del}/>)
          .getDOMNode();

    expect(tags.children.length).to.be(2)
    trigger.click(tags.children[1].children[1]) // click button

    expect(del.calledOnce).to.be(true)
    expect(del.calledWith(dataList[1])).to.be(true)
  })

  it('should change value when tag is clicked', function(){
    var change = sinon.spy()
      , select = render(<Select onChange={change} value={[dataList[0], dataList[1]]} data={dataList} textField='label' valueField='id' />)
      , tags   = findType(select, TagList).getDOMNode()

    expect(tags.children.length).to.be(2)
    trigger.click(tags.children[1].children[1]) // click button

    expect(change.calledOnce).to.be(true)
    expect(change.args[0][0]).to.eql([ dataList[0] ])
  })

  it('should do nothing when disabled', function(done){
    var select = render(<Select value={['jimmy']} data={dataList} duration={0} disabled={true}/>)
      , input  = findType(select, require('../src/select/search-input.jsx')).getDOMNode()
      , tags   = findType(select, TagList).getDOMNode();

    expect( input.hasAttribute('disabled')).to.be(true);
    expect( input.getAttribute('aria-disabled')).to.be('true');
    expect( input.getAttribute('disabled')).to.be('');

    trigger.click(findTag(select, 'button').getDOMNode())

    setTimeout(function() {
      expect(select.state.open).to.be(false)
      expect(tags.children.length).to.be(1)
      expect(select.getDOMNode().className).to.not.match(/\brw-state-focus\b/)
      done()
    }, 0) 
  })

  it('should disable only certain tags', function(done){
    var select = render(<Select value={[0,1]} data={dataList} disabled={[1]}  textField='label' valueField='id'/>)
      , input  = findType(select, require('../src/select/search-input.jsx')).getDOMNode()
      , tags   = findType(select, TagList).getDOMNode();

    expect(tags.children.length).to.be(2)
    expect(tags.children[1].className).to.match(/\brw-state-disabled\b/);

    trigger.click(tags.children[1].children[1]) // click button

    setTimeout(function() {
      expect(select.state.open).to.be(true)
      expect(tags.children.length).to.be(2)
      done()
    }, 0) 
  })

  it('should do nothing when readonly', function(done){
    var select = render(<Select value={['jimmy']} data={dataList} duration={0} readOnly={true}/>)
      , input  = findType(select, require('../src/select/search-input.jsx')).getDOMNode()
      , tags   = findType(select, TagList).getDOMNode();

    expect( input.hasAttribute('readonly')).to.be(true);
    expect( input.getAttribute('aria-readonly')).to.be('true');
    expect( input.getAttribute('readonly')).to.be('');

    trigger.click(findTag(select, 'button').getDOMNode())

    setTimeout(function() {
      expect(select.state.open).to.be(false)
      expect(tags.children.length).to.be(1)
      done()
    }, 0) 
  })

  it('should readonly only certain tags', function(done){
    var select = render(<Select value={[0,1]} data={dataList} readOnly={[1]}  textField='label' valueField='id'/>)
      , input  = findType(select, require('../src/select/search-input.jsx')).getDOMNode()
      , tags   = findType(select, TagList).getDOMNode();

    expect(tags.children.length).to.be(2)

    trigger.click(tags.children[1].children[1]) // click button

    setTimeout(function() {
      expect(select.state.open).to.be(true)
      expect(tags.children.length).to.be(2)
      expect(select.getDOMNode().className).to.match(/\brw-state-focus\b/)

      done()
    }, 10) 
  })

  it('should change values on key down', function(){
    var change = sinon.spy()
      , select = render(<Select value={[0,1,2]} data={dataList} textField='label' valueField='id' onChange={change}/>)
      , tags   = findType(select, TagList).getDOMNode();

    trigger.keyDown(select.getDOMNode(), { key: 'ArrowLeft'})

    expect(tags.children[2].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'ArrowLeft'})

    expect(tags.children[1].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[2].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'ArrowRight'})

    expect(tags.children[2].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'Home'})

    expect(tags.children[0].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)
    
    trigger.keyDown(select.getDOMNode(), { key: 'Delete'})

    expect(change.calledOnce).to.be(true)
    expect(change.args[0][0]).to.eql(dataList.slice(1, 3))
    change.reset()

    trigger.keyDown(select.getDOMNode(), { key: 'End'})

    expect(tags.children[2].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'Backspace'})

    expect(change.calledOnce).to.be(true)
    expect(change.args[0][0]).to.eql(dataList.slice(0, 2))
    change.reset()

    trigger.keyDown(select.getDOMNode(), { key: 'ArrowDown'})
    expect(select.state.open).to.be(true)
  })

})