import React from 'react'

export default function Navbar() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 border-b mb-5 bg-gray-700">
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="block lg:hidden h-10 w-auto"
              src="/media/RDex.png"
              alt="RDex logo"
            />
            <img
              className="hidden lg:block h-10 w-auto"
              src="/media/RDex.png"
              alt="RDex logo"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
