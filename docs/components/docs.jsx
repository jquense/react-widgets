'use strict';
var React          = require('react')
  , cx             = require('../../lib/util/cx')
  , Navbar         = require('./topnavbar.jsx')
  , Tbs            = require('../bootstrap')
  , GettingStarted = require('./pages/GettingStarted.jsx')
  , DropdownList   = require('./pages/DropdownList.jsx')
  , ComboBox       = require('./pages/ComboBox.jsx')
  , MultiSelect    = require('./pages/MultSelect.jsx')
  , SelectList     = require('./pages/SelectList.jsx')
  , Calendar       = require('./pages/Calendar.jsx')
  , DatePicker     = require('./pages/DateTimePicker.jsx')
  , NumberPicker   = require('./pages/NumberPicker.jsx')
  , Migration      = require('./pages/Migration.jsx');

//require('../docs.css')

var locations = [
      '#intro','#dropdown-list', '#combobox',
      '#number-picker', '#selectlist', 
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
      this.setState({ sideHref: location.hash.split('/')[0] })
  },

  render: function(){
    var href = this.state.sideHref;

    return (
      <div style={{ marginTop: 72 }}>
        <Navbar page={this.props.page}/>
        <div className='container'>
          <aside className='col-sm-3 section'>
            <div className='nav-aside section-inner'>
              <Tbs.Nav className='side-nav' activeHref={href} onSelect={this.handleNavItemSelect}>
                <Tbs.SubNav key={0} href='#intro' text='Getting Started'>
                  <Tbs.NavItem key={0} href="#intro/install">Install</Tbs.NavItem>
                  <Tbs.NavItem key={1} href="#intro/deps">External Dependencies</Tbs.NavItem>
                  <Tbs.NavItem key={2} href="#intro/browser">Older Browser Support</Tbs.NavItem>
                  <Tbs.NavItem key={3} href="#intro/access">Accessibility</Tbs.NavItem>
                  <Tbs.NavItem key={4} href="#intro/style">Styling</Tbs.NavItem>
                </Tbs.SubNav>
                <Tbs.NavItem key={1} href='#DropdownList'>Dropdown List</Tbs.NavItem>
                <Tbs.NavItem key={2} href='#combobox'>Combobox</Tbs.NavItem>
                <Tbs.NavItem key={3} href='#number-picker'>Number Picker</Tbs.NavItem>
                <Tbs.NavItem key={4} href='#multiselect'>Multiselect</Tbs.NavItem>
                <Tbs.NavItem key={5} href='#selectlist' >SelectList</Tbs.NavItem>
                <Tbs.NavItem key={6} href='#calendar'>Calendar</Tbs.NavItem>
                <Tbs.NavItem key={7} href='#date-picker'>{'Date &  Time Picker'}</Tbs.NavItem>

                <Tbs.NavItem key={8} href='#migration'>Migrating to 2.x</Tbs.NavItem>
              </Tbs.Nav>
            </div>
          </aside>
          <article className='col-sm-9 section'>
            <div className='tab-content section-inner'>
              <GettingStarted className ={cx({"tab-pane": true, "active": href.split('/')[0] === '#intro' })}/>
              <DropdownList   className ={cx({"tab-pane": true, "active": href === '#DropdownList' })}/>
              <ComboBox       className ={cx({"tab-pane": true, "active": href === '#combobox' })}/>
              <NumberPicker   className ={cx({"tab-pane": true, "active": href === '#number-picker' })}/>
              <MultiSelect    className ={cx({"tab-pane": true, "active": href === '#multiselect' })}/>
              <SelectList     className ={cx({"tab-pane": true, "active": href === '#selectlist' })}/>
              <Calendar       className ={cx({"tab-pane": true, "active": href === '#calendar' })}/>
              <DatePicker     className ={cx({"tab-pane": true, "active": href === '#date-picker' })}/>
              <Migration      className ={cx({"tab-pane": true, "active": href === '#migration' })}/>
              
              <div className='clearfix'style={{ marginTop: 20 }}>
                { locations.indexOf(href) > 0 && 
                  <button type='button' className='btn btn-link pull-left' onClick={this.prev}>« prev</button>
                }
                { locations.indexOf(href) < (locations.length - 1) && 
                  <button type='button' className='btn btn-link pull-right' onClick={this.next}>next »</button>
                }
              </div>
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
    var change = this.state.sideHref.split('/')[0] !== href.split('/')[0]
    this.setState({ sideHref: href });
    window.location = href;
    if(change)
      window.scrollTo(0, 0)
  }
})


React.render(<Docs/>, document.body);
