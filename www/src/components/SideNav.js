import React from 'react';

const _ = less`
  .page--side-nav {
    position: fixed;
    padding: 0;
    top: 150px;
  }
`;

const propTypes = {

};

function SideNav(props) {
  return (
    <nav className="page--side-nav">
      <ul className="list-unstyled">
        {props.children}
      </ul>
    </nav>
  );
}

SideNav.propTypes = propTypes;

export default SideNav;
