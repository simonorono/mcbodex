import React from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { toggleDarkMode } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
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
          'relative inline-flex h-6 w-11 flex-shrink-0',
          'rounded-full border-2 border-transparent',
          'cursor-pointer transition-colors duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
        )}
      >
        <span className="sr-only">Use dark mode</span>
        <span
          className={classNames(
            'rounded-full bg-white shadow ring-0',
            'pointer-events-none relative inline-block h-5 w-5',
            'transform transition duration-200 ease-in-out',
            darkModeEnabled ? 'translate-x-5' : 'translate-x-0'
          )}
        >
          <span
            className={classNames(
              darkModeEnabled
                ? 'opacity-0 duration-100 ease-out'
                : 'opacity-100 duration-200 ease-in',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <SunIcon />
          </span>
          <span
            className={classNames(
              darkModeEnabled
                ? 'opacity-100 duration-200 ease-in'
                : 'opacity-0 duration-100 ease-out',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
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
