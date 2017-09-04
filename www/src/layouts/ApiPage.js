import PropTypes from 'prop-types';
import React from 'react';

import Navbar from '../components/Navbar';

const propTypes = {
  children: PropTypes.func.isRequired,
};

function ApiPage({ children }) {
  return (
    <div>
      <Navbar />
      <main className='page page__default'>
        {children()}
      </main>
    </div>
  );
}

ApiPage.propTypes = propTypes;

export default ApiPage;
