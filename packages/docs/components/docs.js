import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route
  , Router
  , IndexRoute
  , hashHistory } from 'react-router';

import Page from './Page';
import ApiPage from './ApiPage';
import LandingPage from './LandingPage';
import GettingStarted from './pages/GettingStarted.md';
import DropdownList from './pages/DropdownList.api.md';
import ComboBox from './pages/Combobox.api.md';
import MultiSelect from './pages/Multiselect.api.md';
import SelectList from './pages/SelectList.api.md';
import Calendar from './pages/Calendar.api.md';
import DatePicker from './pages/DateTimePicker.api.md';
import NumberPicker from './pages/NumberPicker.api.md';
// import Advanced from './pages/Advanced.js';
import Locale from './pages/i18n.md';
import Theming from './pages/Theming.md';
import Controllables from './pages/controllables.md';

import '@monastic.panic/component-playground/codemirror.css';

import '../styles/docs.less';

import 'codemirror/mode/css/css';

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

function getLocalBundle(page) {
  return (_, cb) => {
    require.ensure([], (require) => {
      require('./locales')
      cb(null, page)
    }, 'locale');
  }
}

ReactDOM.render((
  <Router history={hashHistory} onUpdate={onUpdate}>
    <Route path="/">
      <Route component={LandingPage}>
        <IndexRoute component={GettingStarted}/>
      </Route>

      <Route component={ApiPage}>
        <Route
          path="calendar(/:topic)"
          getComponent={getLocalBundle(Calendar)}
        />
        <Route path="combobox(/:topic)" component={ComboBox} />
        <Route
          path="datetimepicker(/:topic)"
          getComponent={getLocalBundle(DatePicker)}
        />
        <Route path="dropdownlist(/:topic)" component={DropdownList} />
        <Route path="multiselect(/:topic)" component={MultiSelect} />
        <Route
          path="numberpicker(/:topic)"
          getComponent={getLocalBundle(NumberPicker)}
        />
        <Route path="selectlist(/:topic)" component={SelectList} />
      </Route>

      <Route component={Page}>
        {/* <Route path="advanced" component={Advanced} /> */}
        <Route path="i18n" component={Locale} />
        <Route path="theming" component={Theming} />
        <Route path="controllables" component={Controllables} />
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
