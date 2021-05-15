import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PokedexSelect from './PokedexSelect'
import NavbarMenu from './NavbarMenu'

import desktopLogo from '/media/RDex.png'
import mobileLogo from '/media/RD.png'

export default function Navbar() {
  const location = useLocation()

  const isIndex = location.pathname === "/"

  return (
    <div className="mx-auto px-2 sm:px-6 lg:px-8 border-b mb-5 bg-gray-700">
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" title="Pokémon List">
              <img
                width={72} height={40}
                className="hidden mobile:block h-10 w-auto"
                src={mobileLogo}
                alt="RDex logo"
              />
              <img
                width={128} height={40}
                className="block mobile:hidden h-10 w-auto"
                src={desktopLogo}
                alt="RDex logo"
              />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {isIndex && <PokedexSelect />}

          <div className="ml-2 flex items-center">
            <NavbarMenu/>
          </div>
        </div>
      </div>
    </div>
  )
}
