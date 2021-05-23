import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from './components/Navbar'

function scrollToTopInner(props: any) {
  const { history } = props

  useEffect(() => {
    const unlisten = history.listen(() => window.scrollTo(0, 0))

    return () => unlisten()
  })

  return (null)
}

const ScrollToTop = withRouter(scrollToTopInner)

export default function RDex(props: { [key: string]: any }) {
  const { children } = props

  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          {children}
        </div>
      </div >

      <ScrollToTop />
    </>
  )
}
