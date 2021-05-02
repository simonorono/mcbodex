import React from 'react'
import Navbar from './components/Navbar'

export default function RDex(props: any) {
  const { children } = props

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {children}
      </div>
    </div >
  )
}
