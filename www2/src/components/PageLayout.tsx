import { css } from 'astroturf'
import { Link } from 'gatsby'
import React from 'react'
import DocumentOutline from '@docpocalypse/gatsby-theme/src/components/DocumentOutline'
import Navbar from './Navbar'
import SubNavbar from './SubNavbar'

export interface Props {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/** @public */
function PageLayout({ children, className, style }: Props) {
  return (
    <div
      style={style}
      className={`${className || ''} min-h-screen flex flex-col`}
    >
      <Navbar />
      <SubNavbar />
      <div className="grid">
        <DocumentOutline
          css={css`
            @apply hidden;

            order: 2;

            @screen md {
              @apply col-3 block;
            }
          `}
        />
        <main className="order-1 px-10 col-12 md:col-9">{children}</main>
      </div>
    </div>
  )
}

export default PageLayout
