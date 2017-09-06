import PropTypes from 'prop-types';
import React from 'react';

import Navbar from '../components/Navbar';

const propTypes = {
  children: PropTypes.func.isRequired,
};

function PageLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className='page page__narrow'>
        {children()}
      </main>
    </div>
  );
}

PageLayout.propTypes = propTypes;

export default PageLayout;
