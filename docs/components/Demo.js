import React from 'react';


function Demo({ children }) {
  return (
    <section className='demo' role='application'>
      {children}
    </section>
  );
}

Demo.Stage = ({children}) => <div className='demo-stage'>{children}</div>;
Demo.Controls = ({children}) => <div className='demo-controls'>{children}</div>;

export default Demo;
