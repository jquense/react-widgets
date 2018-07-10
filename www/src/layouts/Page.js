import React from 'react'

import Navbar from '../components/Navbar'

function PageLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="page page__narrow">{children}</main>
    </div>
  )
}

export default PageLayout
