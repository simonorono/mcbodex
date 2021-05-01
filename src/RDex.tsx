import React from 'react'
import Sidebar from './components/Sidebar'

export default function RDex(props: any) {
  const { children } = props

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      {children}
    </div>
  )
}
