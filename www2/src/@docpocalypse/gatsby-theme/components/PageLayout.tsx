import React from 'react'
import { DocumentOutline, Navbar } from '@docpocalypse/gatsby-theme'

export interface Props {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/** @public */
function PageLayout({ children, className, style }: Props) {
  return (
    <div
      className={className}
      style={style}
      // css={dcss`
      //   @apply min-h-screen flex flex-col
      // `}
    >
      <Navbar />
      <div className="grid">
        {/* <DocumentOutline
        // css={dcss`
        //   @apply hidden;
        //   order: 2;
        //   @screen xl { @apply col-2 block };
        // `}
        /> */}
        <main className="order-1 px-10 col-12 md:col-9">{children}</main>
      </div>
    </div>
  )
}

export default PageLayout
