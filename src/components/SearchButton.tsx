import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchModal from './SearchModal'

export default function SearchButton() {
  const [open, setIfOpen] = useState(false)

  useHotkeys(['ctrl+k', 'cmd+k'], () => setIfOpen(!open), {
    preventDefault: true,
  })

  return (
    <div>
      <button
        onClick={() => setIfOpen(true)}
        className="flex h-full items-center rounded-full text-white focus:outline-none"
      >
        <span className="sr-only">Open search</span>
        <MagnifyingGlassIcon className="h-8 w-8" aria-hidden="true" />
      </button>

      <SearchModal open={open} close={() => setIfOpen(false)} />
    </div>
  )
}
