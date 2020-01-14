import { css } from 'astroturf'
import { Link } from 'gatsby'
import React from 'react'

function SubNavbar() {
  return (
    <div
      css={css`
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
          &:hover {
            text-decoration: underline;
          }
        }

        & > * + * {
          padding-left: 20px;
        }
      `}
    >
      <Link to="/" partiallyActive={false} title="Getting Started">
        <i className="fas fa-play" />
        <span className="hidden md:inline"> Getting Started</span>
      </Link>
      <Link to="/localization/" title="Localization">
        <i className="fas fa-globe" />
        <span className="hidden md:inline"> Localization</span>
      </Link>
      <Link to="/theming/" title="Theming">
        <i className="fab fa-css3" />
        <span className="hidden md:inline"> Theming</span>
      </Link>
      <Link to="/controllables/" title="Controlled Components">
        <i className="fas fa-cogs" />
        <span className="hidden md:inline"> Controlled Components</span>
      </Link>
      <a href="https://github.com/jquense/react-widgets" title="Github">
        <i className="fab fa-github" />
        <span className="hidden md:inline"> Github</span>
      </a>
    </div>
  )
}

export default SubNavbar
