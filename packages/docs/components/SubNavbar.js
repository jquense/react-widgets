import React from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';


const styles = less`
  .app-subnavbar {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0273a3;
    padding: 10px 0 5px;

    & > * {
      &,
      &:focus,
      &:hover,
      &:active{
        color: white;
      }
    }

    & > * + * {
      padding-left: 20px;
    }
  }
`;


export default function SubNavbar() {
  return (
    <div className="app-subnavbar">
      <LinkContainer to="/" onlyActiveOnIndex>
        <a><i className='fa fa-play'/> Getting Started</a>
      </LinkContainer>
      <LinkContainer to="/i18n">
        <a><i className='fa fa-globe'/> Localization </a >
      </LinkContainer>
      <LinkContainer to="/controllables">
        <a><i className='fa fa-cogs'/> Controlled components</a >
      </LinkContainer>
      <a href="https://github.com/jquense/react-widgets">
         <i className='fa fa-github'/> Github
      </a>
    </div>
  )
}
