import React from 'react';

import Navbar from './Navbar';

const propTypes = {
  children: React.PropTypes.node.isRequired,
};

function Page({ children }) {
  return (
    <div>
      <Navbar />
      <main className='pg-content'>
        {children}
      </main>
    </div>
  );
}

Page.propTypes = propTypes;

export default Page;
