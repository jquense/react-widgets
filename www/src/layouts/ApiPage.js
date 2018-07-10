import React from 'react'

import Navbar from '../components/Navbar'

function ApiPage({ children }) {
  return (
    <div>
      <Navbar />
      <main className="page page__default">{children}</main>
    </div>
  )
}

export default ApiPage
