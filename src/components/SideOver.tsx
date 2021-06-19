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

import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DotsVerticalIcon, XIcon } from '@heroicons/react/outline'
import Navigation from './Navigation'

export default function Example() {
  const [open, setOpen] = useState(false)

  const onLinkClicked = () => setOpen(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='h-full rounded-full flex items-center text-white focus:outline-none'
      >
        <span className="sr-only">Open options</span>
        <DotsVerticalIcon className="h-8 w-8" aria-hidden="true" />
      </button>

      <Transition.Root show={open}>
        <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={open} onClose={setOpen}>
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-sm">
                  <div className="h-full flex flex-col py-6 bg-blueGray-700 shadow-xl overflow-y-scroll">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">RDex navigation</Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            className={[
                              "bg-blueGray-700 rounded-md text-gray-400 hover:text-white",
                              "focus:outline-none "
                            ].join(' ')}
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <hr className='my-4' />

                    <div className="relative flex-1 px-4 sm:px-6">
                      <Navigation onLinkClicked={onLinkClicked} />
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
