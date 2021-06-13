/**
 * Copyright 2021 Simón Oroño
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import SideOver from './SideOver'

import desktopLogo from '/media/RDex.png'
import mobileLogo from '/media/RD.png'

export default function Navbar() {
  return (
    <div className="mx-0 w-full px-2 sm:px-6 lg:px-8 border-b mb-5 bg-blueGray-700">
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" title="Home">
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
          <div className="ml-2 flex items-center">
            <SideOver />
          </div>
        </div>
      </div>
    </div>
  )
}
