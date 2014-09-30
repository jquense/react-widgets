var React = require('react')
  , cx = require('../../lib/util/cx')
  , Navbar = require('./topnavbar.jsx')
  , Nav = require('react-bootstrap/Nav')
  , Affix = require('react-bootstrap/Affix')
  , NavItem = require('react-bootstrap/NavItem')
  , _ = require('lodash')
  , GettingStarted = require('./pages/GettingStarted.jsx')
  , DropdownList = require('./pages/DropdownList.jsx')
  , ComboBox = require('./pages/ComboBox.jsx')
  , Select = require('./pages/Select.jsx')
  , Calendar = require('./pages/Calendar.jsx')
  , DatePicker = require('./pages/DateTimePicker.jsx')
  , NumberPicker = require('./pages/NumberPicker.jsx');

require('../docs.css')

var locations = [
      '#intro','#dropdown-list', '#combobox',
      '#number-picker', '#select-list', 
      '#calendar', '#date-picker'];

var Docs = React.createClass({

  displayName: 'DocPage',

  getInitialState: function () {
    return {
      sideHref: '#intro',
    }
  },

  componentDidMount: function(){
    if(location.hash)
      this.setState({ sideHref: location.hash })
  },

  render: function(){
    var href = this.state.sideHref;

    return (
      <div style={{ marginTop: 72 }}>
        <Navbar page={this.props.page}/>
        <div className='container'>
          <aside className='col-sm-3'>
            <Affix offsetTop={52} className='nav-aside'>
              <Nav className='side-nav' onSelect={this.handleNavItemSelect}>
                <NavItem key={0} href='#intro' active={href === '#intro' }>Getting Started</NavItem>
                <NavItem key={1} href='#dropdown-list' active={ href === '#dropdown-list' }>Dropdown List</NavItem>
                <NavItem key={2} href='#combobox' active={href === '#combobox'}>Combobox</NavItem>
                <NavItem key={6} href='#number-picker' active={href === '#number-picker' }>Number Picker</NavItem>
                <NavItem key={3} href='#select-list' active={href === '#select-list'}>Select</NavItem>
                <NavItem key={4} href='#calendar' active={href === '#calendar'}>Calendar</NavItem>
                <NavItem key={5} href='#date-picker' active={href === '#date-picker'}>Date Picker</NavItem>
              </Nav>
            </Affix>
          </aside>
          <article className='col-sm-9 tab-content'>
            <GettingStarted className={cx({"tab-pane": true, "active": href === '#intro' })}/>
            <DropdownList className={cx({"tab-pane": true, "active": href === '#dropdown-list' })}/>
            <ComboBox className={cx({"tab-pane": true, "active": href === '#combobox' })}/>

            <NumberPicker className={cx({"tab-pane": true, "active": href === '#number-picker' })}/>
            <Select className={cx({"tab-pane": true, "active": href === '#select-list' })}/>

            <Calendar className={cx({"tab-pane": true, "active": href === '#calendar' })}/>
            <DatePicker className={cx({"tab-pane": true, "active": href === '#date-picker' })}/>
            <div className='clearfix'style={{ marginTop: 20 }}>
              { locations.indexOf(href) > 0 && 
                <button type='button' className='btn btn-link pull-left' onClick={this.prev}>« prev</button>
              }
              { locations.indexOf(href) < (locations.length - 1) && 
                <button type='button' className='btn btn-link pull-right' onClick={this.next}>next »</button>
              }
            </div>
          </article>
        </div>
      </div>
    )
  },
  prev: function(){
    var idx = locations.indexOf(this.state.sideHref)
      , href = locations[Math.max(idx - 1, 0)];

    this.navigate(href)
  },
  next: function(){
    var idx = locations.indexOf(this.state.sideHref)
      , href = locations[Math.min(idx + 1, locations.length -1)]

    this.navigate(href)
  },

  handleNavItemSelect: function (key, href) {
    this.navigate(href)
  },

  navigate: function(href){
    this.setState({ sideHref: href });
    window.location = href;
    window.scrollTo(0, 0)
  }
})


React.renderComponent(
    Docs()
  , document.body);
