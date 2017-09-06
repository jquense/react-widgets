import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';

import SubNavbar from '../components/SubNavbar';
import WidgetNav from '../components/WidgetNav';

const _ = less`
  .widget-nav {
    box-shadow: 0 2px 2px rgba(0, 0, 0, .20);
  }
`;

const propTypes = {
  children: PropTypes.func.isRequired,
};

function LandingPage({ children }) {
  return (
    <div>
      <div className="jumbotron">
        <h1>React Widgets</h1>
        <p>An à la carte set of polished, extensible, and accessible input components</p>
        <div>{`latest: ${__VERSION__} `}</div>
      </div>
      <Navbar staticTop fluid className='widget-nav'>
        <WidgetNav />
      </Navbar>
      <SubNavbar />
      <main className='page page__narrow'>
        {children()}
      </main>
    </div>
  );
}

LandingPage.propTypes = propTypes;

export default LandingPage;
