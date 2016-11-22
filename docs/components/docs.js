import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route
  , Router
  , Link
  , hashHistory } from 'react-router';

import Navbar from './Navbar';
import WidgetList from './WidgetList';
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

import '../styles/docs.less';


var localizers = require('../../src/localizers/globalize')

localizers(require('globalize'))

var widgets = [
  'DropdownList',
  'Combobox',
  'NumberPicker',
  'Multiselect',
  'SelectList',
  'Calendar',
  'DateTimePicker'
];


var Docs = React.createClass({


  render() {
    if (this.props.location.pathname.includes('getting-started')) {
      return (
        <div>
          <div className="jumbotron">
            <h1>react-widgets</h1>
            <p>An à la carte set of polished, extensible, and accessible input components</p>
            <div>
              {`latest: ${__VERSION__}`}

              {' | '}
              <a target='_blank' href="https://github.com/intljusticemission/react-big-calendar">
                <i className='fa fa-github'/> github
              </a>
            </div>
          </div>
          <WidgetList />
          <main className='pg-content'>
            {this.props.children}
          </main>
        </div>
      )
    }

    return (
      <div>
        <Navbar />
        <main className='pg-content'>
          {this.props.children}
        </main>
      </div>
    )
  },
})

function onUpdate() {
  const location = this.state.location;
  setTimeout(() => {
    if (location.action === 'PUSH')
      return window.scrollTo(0, 0);
    if (location.action !== 'POP') return;
    let anchor = document.getElementById(location.pathname);

    if (anchor) {
      anchor.scrollIntoView();
    }
  })
}

ReactDOM.render((
  <Router history={hashHistory} onUpdate={onUpdate}>
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
      <Route path="datetimepicker" component={DatePicker}>
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
