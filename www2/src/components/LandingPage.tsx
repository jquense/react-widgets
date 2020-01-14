import { css } from 'astroturf'
import React from 'react'
import Navbar from './Navbar'
import SubNavbar from './SubNavbar'

function LandingPage({ children }) {
  return (
    <div>
      <div
        className="bg-primary text-white w-100 py-10"
        css={css`
          & > * {
            padding: 0 theme(spacing.6);
          }

          @screen lg {
            & > * {
              padding: 0;
              width: 992px;
              margin: 0 auto;
            }
          }
        `}
      >
        <h1 className="font-brand text-6xl leading-none">React Widgets</h1>
        <p className="text-2xl">
          An à la carte set of polished, extensible, and accessible input
          components
        </p>
        <div>{`latest: ${__VERSION__} `}</div>
      </div>
      <Navbar static />
      <SubNavbar />
      <main
        css={css`
          composes: px-6 mx-auto from global;

          max-width: theme('screens.md');
        `}
      >
        {children}
      </main>
    </div>
  )
}

export default LandingPage
