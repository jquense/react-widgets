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
  , GettingStarted = require('./pages/GettingStarted.jsx')
  , DropdownList   = require('./pages/DropdownList.jsx')
  , ComboBox       = require('./pages/ComboBox.jsx')
  , MultiSelect    = require('./pages/MultSelect.jsx')
  , SelectList     = require('./pages/SelectList.jsx')
  , Calendar       = require('./pages/Calendar.jsx')
  , DatePicker     = require('./pages/DateTimePicker.jsx')
  , NumberPicker   = require('./pages/NumberPicker.jsx')
  , Migration      = require('./pages/Migration.jsx')
  , Advanced       = require('./pages/Advanced.jsx');


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
                    <ul className='nav'>
                      <li><Link to='/getting-started/install'>Install</Link></li>
                      <li><Link to='/getting-started/deps'>External Dependencies</Link></li>
                      <li><Link to='/getting-started/browser'>Older Browser Support</Link></li>
                      <li><Link to='/getting-started/access'>Accessibility</Link></li>
                      <li><Link to='/getting-started/style'>Styling</Link></li>
                      <li><Link to='/getting-started/configuration'>Configuration</Link></li>
                    </ul>
                  </li>
                  <li><Link to='dropdown-list'>Dropdown List</Link></li>
                  <li><Link to='combobox' href='#combobox'>Combobox</Link></li>
                  <li><Link to='number-picker' href='#number-picker'>Number Picker</Link></li>
                  <li><Link to='multiselect' href='#multiselect'>Multiselect</Link></li>
                  <li><Link to='selectlist'>SelectList</Link></li>
                  <li><Link to='calendar'>Calendar</Link></li>
                  <li><Link to='datetime-picker'>{'Date & Time Picker'}</Link></li>
                  <li><Link to='migration'>Migrating to 2.x</Link></li>

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
    <Route name="number-picker" handler={NumberPicker}>
      <Route path=':topic' handler={NumberPicker}/>
    </Route>

    <Route name="advanced" handler={Advanced} />

    <Route name="migration" handler={Migration} />
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