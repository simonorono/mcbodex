import React from 'react'
import { Link } from 'react-router-dom'
import SideOver from './SideOver'
import SearchButton from './SearchButton'

import desktopLogo from '/media/RDex.png'
import mobileLogo from '/media/RD.png'

export default function Navbar() {
  return (
    <div className="mx-0 w-full px-2 sm:px-6 lg:px-8 border-b mb-5 bg-primary-900">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Link to="/" title="Home">
            <img
              width={72} height={40}
              className="sm:hidden h-10 w-auto"
              src={mobileLogo}
              alt="RDex logo"
            />
            <img
              width={128} height={40}
              className="hidden sm:block h-10 w-auto"
              src={desktopLogo}
              alt="RDex logo"
            />
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SearchButton />
            <SideOver />
          </div>
        </div>
      </div>
    </div>
  )
}
