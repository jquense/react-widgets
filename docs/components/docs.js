import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route
  , Router
  , hashHistory } from 'react-router';

import Navbar from './Navbar';
import GettingStarted from './pages/GettingStarted.md';
import DropdownList from './pages/DropdownList.api.md';
import ComboBox from './pages/Combobox.api.md';
import MultiSelect from './pages/Multiselect.api.md';
import SelectList from './pages/SelectList.api.md';
import Calendar from './pages/Calendar.api.md';
import DatePicker from './pages/DateTimePicker.api.md';
import NumberPicker from './pages/NumberPicker.api.md';
import Advanced from './pages/Advanced.js';
import Locale from './pages/i18n.md';
import Controllables from './pages/controllables.md';

import '@monastic.panic/component-playground/codemirror.css';

import 'react-widgets/less/react-widgets.less';
import '../styles/docs.less';


var localizers = require('../../src/localizers/globalize')

localizers(require('globalize'))

var locations = [
  'getting-started',
  'dropdown-list',
  'combobox',
  'number-picker',
  'multiselect',
  'selectlist',
  'calendar',
  'datetime-picker'
];

var Docs = React.createClass({

  displayName: 'DocPage',

  getInitialState: function () {
    return {
      sideHref: '#intro'
    }
  },

  // componentDidMount: function(){
  //   if (location.hash)
  //     this.setState({ sideHref: location.hash.split('/')[0] })
  // },

  render() {
    return (
      <div>
        <Navbar page={this.props.page}/>
        <main className='pg-content'>
          {this.props.children}
        </main>
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
      <Route path="number-picker" component={NumberPicker}>
        <Route path=':topic' component={NumberPicker}/>
      </Route>

      <Route path="advanced" component={Advanced} />
      <Route path="i18n" component={Locale} />
      <Route path="controllables" component={Controllables} />
    </Route>
  </Router>
), document.getElementById('app-mount'));
