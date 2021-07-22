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

import React, { ReactNode, useEffect, useState } from 'react'

interface Tab {
  value: string,
  label: string,
  component: ReactNode
}

interface Props {
  tabs: Tab[],
}

export default function Tabs(props: Props) {
  const { tabs } = props

  const [selected, setSelected] = useState(tabs[0].value)

  useEffect(() => {
    setSelected(tabs[0].value)
  }, [tabs])

  return (
    <>
      <div className={tabs.length === 1 ? 'hidden' : ''}>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Pokédex list
          </label>
          <select
            id="tabs"
            name="tabs"
            className={[
              "block w-full pl-3 pr-10 py-2 text-base border-gray-300",
              "focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
              "sm:text-sm rounded-md"
            ].join(' ')}
            value={selected}
            onChange={event => setSelected(event.target.value)}
          >
            {tabs.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map(({ value, label }) => (
                <a
                  key={value}
                  className={[
                    value === selected
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-4 font-medium text-sm cursor-pointer'
                  ].join(' ')}
                  onClick={() => setSelected(value)}
                  aria-current={value === selected ? 'page' : undefined}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className='pt-8'>
        {tabs.map(tab => (
          <div key={tab.value} className={tab.value !== selected ? 'hidden' : ''}>
            {tab.component}
          </div>
        ))}
      </div>
    </>
  )
}
