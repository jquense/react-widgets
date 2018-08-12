import React from 'react'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

const _ = css`
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
      &:active {
        color: #ececec;
      }
    }

    & > * + * {
      padding-left: 20px;
    }
  }
`

export default function SubNavbar({ className = '', style }) {
  return (
    <div className={`${className} app-subnavbar`} style={style}>
      <LinkContainer to="/" exact>
        <a>
          <i className="fas fa-play" /> Getting Started
        </a>
      </LinkContainer>
      <LinkContainer to="/localization/">
        <a>
          <i className="fas fa-globe" /> Localization
        </a>
      </LinkContainer>
      <LinkContainer to="/theming/">
        <a>
          <i className="fab fa-css3" /> Theming
        </a>
      </LinkContainer>
      <LinkContainer to="/controllables/">
        <a>
          <i className="fas fa-cogs" /> Controlled components
        </a>
      </LinkContainer>
      <a href="https://github.com/jquense/react-widgets">
        <i className="fab fa-github" /> Github
      </a>
    </div>
  )
}
