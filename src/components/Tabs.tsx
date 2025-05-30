import React, { ReactNode, useEffect, useState } from 'react'

interface Tab {
  value: string
  label: string
  component: ReactNode
  activeByDefault?: boolean
}

interface Props {
  tabs: Tab[]
}

export default function Tabs(props: Props) {
  const { tabs } = props

  const [selected, setSelected] = useState(tabs[0].value)

  useEffect(() => {
    setSelected(tabs.find(_ => _.activeByDefault)?.value || tabs[0].value)
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
              'block w-full border-gray-300 py-2 pr-10 pl-3 text-base',
              'focus:border-primary-500 focus:ring-primary-500 focus:outline-hidden',
              'rounded-md sm:text-sm',
            ].join(' ')}
            value={selected}
            onChange={event => setSelected(event.target.value)}
          >
            {tabs.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map(({ value, label }) => (
                <button
                  key={value}
                  className={[
                    value === selected
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'cursor-pointer border-b-4 px-1 py-4 text-sm font-medium whitespace-nowrap',
                  ].join(' ')}
                  onClick={() => setSelected(value)}
                  aria-current={value === selected ? 'page' : undefined}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="pt-4">
        {tabs.map(tab => (
          <div
            key={tab.value}
            className={tab.value !== selected ? 'hidden' : ''}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </>
  )
}
