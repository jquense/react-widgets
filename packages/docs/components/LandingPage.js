import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/lib/Navbar';
import Link from 'react-router/lib/Link';

import WidgetNav from './WidgetNav';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function LandingPage({ children }) {
  return (
    <div>
      <div className="jumbotron">
        <h1>React Widgets</h1>
        <p>An à la carte set of polished, extensible, and accessible input components</p>
        <div>
          {`latest: ${__VERSION__} | `}

          <Link to="/i18n">
            <i className='fa fa-globe'/> localization
          </Link>
          {' | '}
          <a target='_blank' href="https://github.com/jquense/react-widgets">
            <i className='fa fa-github'/> github
          </a>
        </div>
      </div>
      <Navbar staticTop fluid className='widget-nav'>
        <WidgetNav />
      </Navbar>
      <main className='page page__narrow'>
        {children}
      </main>
    </div>
  );
}

LandingPage.propTypes = propTypes;

export default LandingPage;
