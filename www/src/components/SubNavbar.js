import React from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

const _ = less`
  .app-subnavbar {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #6b7080; //#0273a3;
    padding: 10px 5px;
    font-size: 90%;

    & > * {
      &,
      &:focus,
      &:hover,
      &:active{
        color: #ececec;
      }
    }

    & > * + * {
      padding-left: 20px;
    }
  }
`;


export default function SubNavbar({ className = '', style }) {
  return (
    <div className={`${className} app-subnavbar`} style={style}>
      <LinkContainer to="/react-widgets/" onlyActiveOnIndex>
        <a><i className='fa fa-play'/> Getting Started</a>
      </LinkContainer>
      <LinkContainer to="/react-widgets/localization/">
        <a><i className='fa fa-globe'/> Localization</a>
      </LinkContainer>
      <LinkContainer to="/react-widgets/theming/">
        <a><i className='fa fa-css3'/> Theming</a>
      </LinkContainer>
      <LinkContainer to="/react-widgets/controllables/">
        <a><i className='fa fa-cogs'/> Controlled components</a>
      </LinkContainer>
      <a href="https://github.com/jquense/react-widgets">
         <i className='fa fa-github'/> Github
      </a>
    </div>
  )
}
