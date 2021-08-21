import React from 'react'
import { Switch } from "@headlessui/react"
import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { toggleDarkMode } from "../store"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { classNames } from '../utils'

export default function ToggleDarkMode() {
  const dispatch = useAppDispatch()
  const darkModeEnabled = useAppSelector(state => state.siteSettings.darkMode)

  return (
    <div>
      <Switch
        checked={darkModeEnabled}
        onChange={() => dispatch(toggleDarkMode())}
        className={classNames(
          darkModeEnabled ? 'bg-primary-600' : 'bg-primary-200',
          'relative inline-flex flex-shrink-0 h-6 w-11',
          'border-2 border-transparent rounded-full',
          'cursor-pointer transition-colors ease-in-out duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        )}
      >
        <span className="sr-only">Use dark mode</span>
        <span
          className={classNames(
            'rounded-full bg-white shadow ring-0',
            'pointer-events-none relative inline-block h-5 w-5',
            'transform transition ease-in-out duration-200',
            darkModeEnabled ? 'translate-x-5' : 'translate-x-0',
          )}
        >
          <span
            className={classNames(
              darkModeEnabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <SunIcon />
          </span>
          <span
            className={classNames(
              darkModeEnabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <MoonIcon />
          </span>
        </span>
      </Switch>
    </div>
  )
}
