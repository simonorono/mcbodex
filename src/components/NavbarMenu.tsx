import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left h-full">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="h-full rounded-full flex items-center text-white focus:outline-none">
              <span className="sr-only">Open options</span>
              <DotsVerticalIcon className="h-8 w-8" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  <Link to="/about" className="py-2 px-3 w-full block">About</Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
