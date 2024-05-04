import React from 'react'
import { Link } from 'react-router-dom'
import SideOver from './SideOver'
import SearchButton from './SearchButton'

import desktopLogo from '/media/RDex.png'
import mobileLogo from '/media/RD.png'

export default function Navbar() {
  return (
    <div className="mx-0 mb-5 w-full border-b bg-primary-900 px-2 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex items-center">
          <Link to="/" title="Home">
            <img
              width={72}
              height={40}
              className="h-10 w-auto sm:hidden"
              src={mobileLogo}
              alt="logo"
            />
            <img
              width={128}
              height={40}
              className="hidden h-10 w-auto sm:block"
              src={desktopLogo}
              alt="logo"
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
