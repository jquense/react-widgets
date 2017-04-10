import React from 'react';

import PropTypes from 'prop-types';

import Navbar from './Navbar';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ApiPage({ children }) {
  return (
    <div>
      <Navbar />
      <main className='page page__default'>
        {children}
      </main>
    </div>
  );
}

ApiPage.propTypes = propTypes;

export default ApiPage;
