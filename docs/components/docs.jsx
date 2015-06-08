'use strict';
var React = require('react')
  , { Route
  , create: createRouter
  , DefaultRoute
  , RouteHandler
  , Navigation
  , State
  , Link } = require('react-router')

  , Affix          = require('../bootstrap').Affix
  , Navbar         = require('./topnavbar.jsx')
  , GettingStarted = require('./pages/GettingStarted.md')
  , DropdownList   = require('./pages/DropdownList.api.md')
  , ComboBox       = require('./pages/Combobox.api.md')
  , MultiSelect    = require('./pages/Multiselect.api.md')
  , SelectList     = require('./pages/SelectList.api.md')
  , Calendar       = require('./pages/Calendar.api.md')
  , DatePicker     = require('./pages/DateTimePicker.api.md')
  , NumberPicker   = require('./pages/NumberPicker.api.md')
  //, Migration      = require('./pages/Migration.jsx')
  , Advanced       = require('./pages/Advanced.jsx')
  , Locale         = require('./pages/i18n.md');

require('../vendor/codemirror.css')
require('../vendor/neo.css')
require('../vendor/styles.css')
require('../../src/less/react-widgets.less')
require('../docs.css')

var locations = [
      'getting-started','dropdown-list', 'combobox',
      'number-picker', 'multiselect', 'selectlist', 
      'calendar', 'datetime-picker'];

var Docs = React.createClass({

  displayName: 'DocPage',

  mixins: [ Navigation, State ],

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
      <div>
        <Navbar page={this.props.page}/>
        <div className='container'>
          <aside className='col-sm-3 section'>
            <Affix className='nav-aside section-inner' offsetTop={52}>
              <nav className='side-nav'>
                <ul className='nav'>
                  <li className={this.getPathname().match(/\/getting-started/) ? 'active' : ''}>
                    <Link to='/getting-started'>Getting Started</Link>
                  </li>
                  <li><Link to='i18n'>Localization</Link></li>
                  <li className='side-divider'>API</li>
                  <li><Link to='dropdownlist'>Dropdown List</Link></li>
                  <li><Link to='combobox' href='#combobox'>Combobox</Link></li>
                  <li><Link to='numberpicker' href='#number-picker'>Number Picker</Link></li>
                  <li><Link to='multiselect' href='#multiselect'>Multiselect</Link></li>
                  <li><Link to='selectlist'>Select List</Link></li>
                  <li><Link to='calendar'>Calendar</Link></li>
                  <li><Link to='datetime-picker'>{'Date & Time Picker'}</Link></li>

                  {/* <li><Link to='advanced'>Advanced</Link></li> */}
                </ul>
              </nav>
            </Affix>
          </aside>
          <article className='col-sm-9 section'>
            <div className='section-inner'>
              <RouteHandler />
              {/*<div className='clearfix'style={{ marginTop: 20 }}>
                { locations.indexOf(href) > 0 && 
                  <button type='button' className='btn btn-link pull-left' onClick={this.prev}>« prev</button>
                }
                { locations.indexOf(href) < (locations.length - 1) && 
                  <button type='button' className='btn btn-link pull-right' onClick={this.next}>next »</button>
                }
              </div> */}
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

  handleNavItemSelect: function (key) {
    this.transitionTo(key)
  },

  navigate: function(href){
    // var change = this.state.sideHref.split('/')[0] !== href.split('/')[0]
    // this.setState({ sideHref: href });
    // window.location = href;
    // if(change)
    //   window.scrollTo(0, 0)
  }
})



var routes = (
  <Route name="app" path="/" handler={Docs}>
    <DefaultRoute handler={GettingStarted} />

    <Route name="getting-started" path='getting-started/?:topic?' handler={GettingStarted}/>

    <Route name="dropdown-list" path='dropdown-list' handler={DropdownList}>
      <Route path=':topic' handler={DropdownList}/>
    </Route>
    <Route name="combobox" handler={ComboBox}>
      <Route path=':topic' handler={ComboBox}/>
    </Route>
    <Route name="multiselect" handler={MultiSelect}>
      <Route path=':topic' handler={MultiSelect}/>
    </Route>
    <Route name="selectlist" handler={SelectList}>
      <Route path=':topic' handler={SelectList}/>
    </Route>
    <Route name="calendar" handler={Calendar}>
      <Route path=':topic' handler={Calendar}/>
    </Route>
    <Route name="datetime-picker" handler={DatePicker}>
      <Route path=':topic' handler={DatePicker}/>
    </Route>
    <Route name="numberpicker" handler={NumberPicker}>
      <Route path=':topic' handler={NumberPicker}/>
    </Route>

    <Route name="advanced" handler={Advanced} />
    <Route name="i18n" handler={Locale} />
  </Route>
);

var rootInstance = null;

createRouter({ 
    routes, 
    scrollBehavior: {
      updateScrollPosition(pos, action){
        var anchor = document.getElementById(location.hash.substr(1))

        pos = pos || {}

        if( anchor)
          return window.scrollTo(pos ? pos.x : window.pageXOffset, anchor.offsetTop)

        switch (action) {
          case 'push':
          case 'replace':
            window.scrollTo(0, 0);
            break;
          case 'pop':
            window.scrollTo(pos.x || 0, pos.y || 0);
            break;
        }
      }
    }
  })
  .run(function (Handler, state) {
    rootInstance = React.render(<Handler params={state.params}/>, document.body);
  });


if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}