'use strict';
var React = require('react')
var ReactDOM = require('react-dom')
var {
    Route
  , Router
  , Navigation
  , State
  , Link } = require('react-router')

var Affix          = require('../bootstrap').Affix
var Navbar         = require('./topnavbar.jsx')
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
var OtherProjects  = require('./pages/OtherProjects.md');

var history = require('react-router/lib/HashHistory').history


require('../vendor/codemirror.css')
require('../vendor/styles.css')
require('../vendor/oceanic-prism.css')
require('../vendor/oceanic-codemirror.css')
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

                  <li><Link to='/others'>{'Other projects'}</Link></li>
                  {/*<li><Link to='advanced'>Advanced</Link></li> */}
                </ul>
              </nav>
            </Affix>
          </aside>
          <article className='col-sm-9 section'>
            <div className='section-inner'>
              {this.props.children}
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
      , href = locations[Math.min(idx + 1, locations.length - 1)]

    this.navigate(href)
  },

  handleNavItemSelect: function (key) {
    this.transitionTo(key)
  },

  navigate: function(){
    // var change = this.state.sideHref.split('/')[0] !== href.split('/')[0]
    // this.setState({ sideHref: href });
    // window.location = href;
    // if(change)
    //   window.scrollTo(0, 0)
  }
})


export class Thing extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
}


ReactDOM.render((
  <Router history={history}>
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
      <Route path="others" component={OtherProjects} />
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
