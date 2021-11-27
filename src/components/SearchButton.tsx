import React, { useEffect, useState } from 'react'
import { IWithShortcut, withShortcut } from 'react-keybind'
import { SearchIcon } from '@heroicons/react/outline'
import SearchModal from './SearchModal'

function SearchButton({ shortcut }: IWithShortcut) {
  const [open, setIfOpen] = useState(false)

  const toggleModal = () => setIfOpen(!open)

  useEffect(() => {
    shortcut?.registerShortcut?.(toggleModal, ['ctrl+f', 'cmd+f'], 'Search', 'Search Pokémon')

    return () => shortcut?.unregisterShortcut?.(['ctrl-f', 'cmd-f'])
  }, [])

  return (
    <div>
      <button
        onClick={() => setIfOpen(true)}
        className='h-full rounded-full flex items-center text-white focus:outline-none'
      >
        <span className="sr-only">Open search</span>
        <SearchIcon className="h-8 w-8" aria-hidden="true" />
      </button>

      <SearchModal
        open={open}
        close={() => setIfOpen(false)}
      />
    </div>
  )
}

export default withShortcut(SearchButton)
