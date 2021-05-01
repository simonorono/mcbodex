import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="flex flex-col flex-1 bg-gray-800">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link to="/">
            <img
              className="h-8 w-auto"
              src="/media/RDex.png"
              alt="RDex logo"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
