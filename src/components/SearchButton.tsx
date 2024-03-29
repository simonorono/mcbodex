import React, { useEffect, useState } from 'react'
import { useShortcut } from 'react-keybind'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchModal from './SearchModal'

export default function SearchButton() {
  const { registerShortcut, unregisterShortcut } = useShortcut()

  const [open, setIfOpen] = useState(false)

  useEffect(() => {
    const toggleModal = () => setIfOpen(!open)

    registerShortcut(
      toggleModal,
      ['ctrl+k', 'cmd+k'],
      'Search',
      'Search Pokémon'
    )

    return () => unregisterShortcut(['ctrl-k', 'cmd-k'])
  }, [])

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
