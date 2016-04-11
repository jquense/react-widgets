'use strict';
var React = require('react')
var ReactDOM = require('react-dom')
var {
    Route
  , Router
  , Navigation
  , State
  , hashHistory
  , Link } = require('react-router')

var Affix = require('react-overlays/lib/AutoAffix')
var Navbar = require('./Navbar')
var Nav = require('react-bootstrap/lib/Nav')
var GettingStarted = require('./pages/GettingStarted.md')
var DropdownList   = require('./pages/DropdownList.api.md')
var ComboBox       = require('./pages/Combobox.api.md')
var MultiSelect    = require('./pages/Multiselect.api.md')
var SelectList     = require('./pages/SelectList.api.md')
var Calendar       = require('./pages/Calendar.api.md')
var DatePicker     = require('./pages/DateTimePicker.api.md')
var NumberPicker   = require('./pages/NumberPicker.api.md')
//var Migration      = require('./pages/Migration.jsx')
var Advanced       = require('./pages/Advanced.jsx')
var Locale         = require('./pages/i18n.md');
var Controllables  = require('./pages/controllables.md');


require('@monastic.panic/component-playground/codemirror.css')
require('@monastic.panic/component-playground/themes/oceanic.css')

require('../vendor/styles.css')
require('react-widgets/less/react-widgets.less')
require('../docs.css')


var localizers = require('../../src/localizers/globalize')

localizers(require('globalize'))


var locations = [
      'getting-started', 'dropdown-list', 'combobox',
      'number-picker', 'multiselect', 'selectlist',
      'calendar', 'datetime-picker'];

var Docs = React.createClass({

  displayName: 'DocPage',

  mixins: [ Navigation, State ],

  getInitialState: function () {
    return {
      sideHref: '#intro'
    }
  },

  componentDidMount: function(){
    if(location.hash)
      this.setState({ sideHref: location.hash.split('/')[0] })
  },

  render() {
    return (
      <div>
        <Navbar page={this.props.page}/>
        <div className='container'>
          <aside className='col-sm-3 section'>
            <Affix viewportOffsetTop={20}>
              <div className='nav-aside section-inner'>
                <nav className='side-nav'>
                  <Nav>
                    <li className={'active'}>
                      <Link to='/getting-started'>Getting Started</Link>
                    </li>
                    <li><Link to='i18n'>Localization</Link></li>
                    <li className='side-divider'>API</li>
                    <li><Link to='/dropdownlist'>Dropdown List</Link></li>
                    <li><Link to='/combobox' href='#combobox'>Combobox</Link></li>
                    <li><Link to='/numberpicker' href='#number-picker'>Number Picker</Link></li>
                    <li><Link to='/multiselect' href='#multiselect'>Multiselect</Link></li>
                    <li><Link to='/selectlist'>Select List</Link></li>
                    <li><Link to='/calendar'>Calendar</Link></li>
                    <li><Link to='/datetime-picker'>{'Date & Time Picker'}</Link></li>

                    {/*<li><Link to='advanced'>Advanced</Link></li> */}
                  </Nav>
                </nav>
              </div>
            </Affix>
          </aside>
          <article className='col-sm-9 section'>
            <div className='section-inner'>
              {this.props.children}
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
  prev() {
    var idx = locations.indexOf(this.state.sideHref)
      , href = locations[Math.max(idx - 1, 0)];

    this.navigate(href)
  },

  next() {
    var idx = locations.indexOf(this.state.sideHref)
      , href = locations[Math.min(idx + 1, locations.length -1)]

    this.navigate(href)
  },

  handleNavItemSelect: function (key) {
    this.transitionTo(key)
  }
})


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Docs} indexRoute={{ component: GettingStarted }}>
      <Route path='getting-started(/:topic)' component={GettingStarted}/>

      <Route  path='dropdownlist' component={DropdownList}>
        <Route path=':topic' component={DropdownList}/>
      </Route>
      <Route path="combobox" component={ComboBox}>
        <Route path=':topic' component={ComboBox}/>
      </Route>
      <Route path="multiselect" component={MultiSelect}>
        <Route path=':topic' component={MultiSelect}/>
      </Route>
      <Route path="selectlist" component={SelectList}>
        <Route path=':topic' component={SelectList}/>
      </Route>
      <Route path="calendar" component={Calendar}>
        <Route path=':topic' component={Calendar}/>
      </Route>
      <Route path="datetime-picker" component={DatePicker}>
        <Route path=':topic' component={DatePicker}/>
      </Route>
      <Route path="numberpicker" component={NumberPicker}>
        <Route path=':topic' component={NumberPicker}/>
      </Route>

      <Route path="advanced" component={Advanced} />
      <Route path="i18n" component={Locale} />
      <Route path="controllables" component={Controllables} />
    </Route>
  </Router>
), document.getElementById('app-mount'));


// createRouter({
//     routes,
//     scrollBehavior: {
//       updateScrollPosition(pos, action){
//         var anchor = document.getElementById(location.hash.substr(1))

//         pos = pos || {}

//         if( anchor)
//           return window.scrollTo(pos ? pos.x : window.pageXOffset, anchor.offsetTop)

//         switch (action) {
//           case 'push':
//           case 'replace':
//             window.scrollTo(0, 0);
//             break;
//           case 'pop':
//             window.scrollTo(pos.x || 0, pos.y || 0);
//             break;
//         }
//       }
//     }
//   });
